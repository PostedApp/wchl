import { Arrayable, parsed, querify } from "../../../_helpers";
import fetch from "cross-fetch";
import { isAccessToken, Links } from "..";
import { AccessToken, Scopes } from "../../types";
import { AuthorizeParams, GrantParams, GrantResponse } from "./types";

export const defaultAuthScope = ["email", "openid", "profile"] as const;

export async function grantAccessToken(
  params: GrantParams
): Promise<AccessToken> {
  const {
    json: {
      access_token,
      expires_in,
      refresh_token = params.refresh_token,
      scope,
    },
  } = await parsed<GrantResponse>(
    fetch(Links.token, {
      body: querify(params, { prefix: "" }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })
  );

  return {
    token: {
      _grant: refresh_token
        ? {
            client_id: params.client_id,
            client_secret: params.client_secret,
            expiry_date: Date.now() + expires_in * 1000,
            refresh_token,
          }
        : undefined,
      _scopes: scope.split(" "),
      access_token,
    },
  };
}

export function getAuthorizeUrl<S extends Arrayable<Scopes>>(
  params: AuthorizeParams<S>
) {
  return encodeURI(
    Links.auth +
      querify(
        { ...params, scope: params.scope || defaultAuthScope },
        { array: " " }
      )
  );
}

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
