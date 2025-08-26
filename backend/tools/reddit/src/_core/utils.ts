import { Arrayable, arrayed, parsed, querify } from "../_helpers";
import fetch from "cross-fetch";
import { Base64 } from "js-base64";
import {
  AccessToken,
  AuthorizeParams,
  GrantParams,
  GrantResponse,
  Scopes,
} from "./types";

export async function grantAccessToken({
  client_id,
  client_secret = "",
  ...rest
}: GrantParams): Promise<AccessToken> {
  const {
    json: {
      access_token,
      expires_in,
      refresh_token = rest.refresh_token,
      scope,
    },
  } = await parsed<GrantResponse>(
    fetch(Links.access_token, {
      body: querify(rest, { prefix: "" }),
      headers: {
        Authorization: `Basic ${Base64.encode(
          [client_id, client_secret].join(":")
        )}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })
  );

  return {
    token: {
      _grant: refresh_token
        ? {
            client_id,
            client_secret,
            expiry_date: Date.now() + expires_in * 1000,
            refresh_token,
          }
        : undefined,
      _scopes: scope.split(" "),
      access_token,
    },
  };
}

export function getAuthorizeUrl(
  { state = "", ...rest }: AuthorizeParams,
  compact: ".compact" | "" = ""
) {
  return encodeURI(
    Links.authorize +
      compact +
      querify(
        {
          ...rest,
          state: JSON.stringify(state),
        },
        { array: " " }
      )
  );
}

export function isAccessToken<S extends Arrayable<Scopes> = any>(
  arg: any,
  scopes?: S
): arg is AccessToken<S> {
  if (!(typeof arg?.token?.access_token === "string")) return false;
  if (!scopes) return true;

  const argScopes: Scopes[] = Array.isArray(arg._scopes)
    ? arg._scopes
    : typeof arg._scopes === "string" && arg._scopes.split(" ");
  return (
    Array.isArray(argScopes) &&
    arrayed(scopes).some((scope) => argScopes.includes(scope))
  );
}

export const Links = {
  access_token: "https://www.reddit.com/api/v1/access_token",
  authorize: "https://www.reddit.com/api/v1/authorize",
  oauth: "https://oauth.reddit.com",
  www: "https://www.reddit.com",
} as const;

export function popSlash(input: string) {
  return input.split("/").pop();
}

export const Status = {
  ExceededRatelimit: "Exceeded Ratelimit",
} as const;

export async function prepareAccessToken<T extends AccessToken>(auth: T | any) {
  try {
    if (!isAccessToken(auth)) return;
    if (!auth.token._grant?.refresh_token) return;

    const { expiry_date, ...rest } = auth.token._grant;
    if (expiry_date > Date.now() + 120 * 1000) return auth;
    const { token } = await grantAccessToken({
      ...rest,
      grant_type: "refresh_token",
    });
    Object.assign(auth.token, token);
    return auth;
  } catch {
    return;
  }
}
