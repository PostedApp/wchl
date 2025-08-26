import { Arrayable, arrayed } from "../../_helpers";
import { AccessToken, Scopes } from "../types";
export * from "./authorize";

export function isAccessToken<S extends Arrayable<Scopes> = any>(
  arg: any,
  scopes?: S
): arg is AccessToken<S> {
  if (!(typeof arg?.token?.access_token === "string")) return false;
  if (!scopes) return true;

  const argScopes: Scopes[] = Array.isArray(arg.token._scopes)
    ? arg.token._scopes
    : typeof arg.token._scopes === "string" && arg.token._scopes.split(" ");
  return (
    Array.isArray(argScopes) &&
    arrayed(scopes).some((scope) => argScopes.includes(scope))
  );
}

export const Links = {
  auth: "https://accounts.google.com/o/oauth2/v2/auth",
  revoke: "https://oauth2.googleapis.com/revoke",
  token: "https://oauth2.googleapis.com/token",
  v3: "https://www.googleapis.com/youtube/v3",
} as const;

export const Status = {
  Unauthorized: "401",
} as const;
