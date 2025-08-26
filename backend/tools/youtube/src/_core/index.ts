import { parsed, querify, replaceSpaces, tryCached } from "../_helpers";
import fetch from "cross-fetch";
import { PaginatedRequest, PaginatedResponse, Query } from "./types";
import { Links, prepareAccessToken } from "./utils";
export * from "./types";
export * from "./utils";

export const defaultPart = "id" as const;

export async function DeleteResource(query: Query) {
  const { uri, headers } = await encode(query);
  return parsed(
    fetch(uri, {
      headers,
      method: "DELETE",
    })
  ).then((response) => response.json);
}

async function encode({ params, endpoint }: Query) {
  await prepareAccessToken(params);
  const { _cached, token, ...rest } = params;
  const uri = encodeURI(
    replaceSpaces(`${Links.v3}/${endpoint}${querify(rest)}`)
  );
  return token
    ? {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        uri,
      }
    : { uri };
}

export async function* GetPaginatedResource<Output, Params>(
  query: Query<Params & Partial<PaginatedRequest>>
) {
  do {
    const response = await GetResource<Output & PaginatedResponse, Params>(
      query
    );
    query.params.pageToken = response?.nextPageToken;
    yield response; // https://github.com/Microsoft/TypeScript/issues/2983
  } while (query.params.pageToken);
}

export async function GetResource<Output, Params>(query: Query<Params>) {
  const { headers, uri } = await encode(query);
  const valued = () =>
    parsed<Output>(fetch(uri, { headers })).then((response) => response.json);
  return tryCached(query.params, {
    key: JSON.stringify({ headers, uri }),
    valued,
  }).then(({ value }) => value);
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
