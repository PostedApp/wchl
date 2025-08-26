import { forEachOf, parsed, querify, tryCached } from "../_helpers";
import fetch from "cross-fetch";
import {
  AccessToken,
  ListingRequest,
  Pagination,
  Query,
  RateLimit,
} from "./types";
import { Links, prepareAccessToken, Status } from "./utils";
export * from "./types";
export * from "./utils";

export async function DeleteResource(query: Query) {
  const { uri, headers } = await encode(query);
  return parsed(
    fetch(uri, {
      headers,
      method: "DELETE",
    })
  ).then((response) => response.json);
}

export async function encode({ endpoint, params }: Query) {
  await prepareAccessToken(params);
  const { token, ...rest } = params;
  const { domain, prefix } = token?.access_token
    ? {
        domain: Links.oauth,
        prefix: "?",
      }
    : { domain: Links.www, prefix: "/.json?" };
  const uri = encodeURI(
    domain + endpoint + querify({ ...rest, raw_json: 1 }, { prefix })
  );

  return token
    ? {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.access_token}`,
          "User-Agent": String(token.userAgent),
        },
        uri,
      }
    : { uri };
}

export async function* GetListingResource<
  Output,
  Params extends ListingRequest
>(query: Query<Params>) {
  const direction = query.params?.before ? "before" : "after";
  do {
    const response = await GetResource<Output & Pagination, Params>(query);
    query.params[direction] = response?.data?.[direction];
    yield response; // https://github.com/Microsoft/TypeScript/issues/2983
  } while (query.params[direction]);
}

export async function GetResource<Output, Params>(query: Query<Params>) {
  query.params && assertRatelimit(query.params);
  const { headers, uri } = await encode(query);
  return tryCached(query.params, {
    key: JSON.stringify({ headers, uri }),
    valued: () => parsed<Output>(fetch(uri, { headers })),
  }).then(({ isCache, value: { json, res } }) => {
    isCache || (query.params && updateRateLimit(query.params, res.headers));
    return json;
  });
}

export async function SetResource<Params, Output, Input = Output>(
  query: Query<Params>,
  method: "POST" | "PUT",
  resource: Input
) {
  const { headers, uri } = await encode(query);
  const body = resource && JSON.stringify(resource);
  return parsed<Output>(
    fetch(uri, {
      body,
      headers,
      method,
    })
  ).then((response) => response.json);
}

function updateRateLimit(auth: AccessToken, headers: Headers) {
  const rateLimit: Partial<RateLimit> = {};
  forEachOf(
    ["x-ratelimit-remaining", "x-ratelimit-reset", "x-ratelimit-used"],
    (key) =>
      headers.has(key) &&
      (rateLimit[key as keyof RateLimit] = Number(headers.get(key)))
  );
  Object.keys(rateLimit).length &&
    auth?.token?._ratelimit &&
    (auth.token._ratelimit = rateLimit as RateLimit);
}

function assertRatelimit(auth: AccessToken) {
  const remaining = Number(auth?.token?._ratelimit?.["x-ratelimit-remaining"]);
  if (isNaN(remaining) || remaining > 0) return true;

  throw Error(Status.ExceededRatelimit);
}
