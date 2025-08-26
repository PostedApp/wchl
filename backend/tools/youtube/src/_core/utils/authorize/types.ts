import { Arrayable, StrictPartial } from "../../../_helpers";
import { StrictUnion } from "simplytyped";
import { Scopes } from "../../types";
export type AuthorizeParams<S extends Arrayable<Scopes>> = Record<
  "client_id" | "redirect_uri",
  string
> &
  Partial<Record<"login_hint" | "state", string>> & {
    scope?: S;
  } & StrictUnion<
    | (StrictUnion<InstalledParams | WebAppParams> & {
        response_type: "code";
      })
    | (WebAppParams & { response_type: "token" })
  >;

export type GrantParams = StrictUnion<
  | (Record<"code" | "redirect_uri", string> & {
      grant_type: "authorization_code";
    })
  | { grant_type: "refresh_token"; refresh_token: string }
> & {
  client_id: string;
  client_secret?: string;
};

export type GrantResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: "Bearer";
};

type InstalledParams = StrictPartial<{
  code_challenge: string;
  code_challenge_method: "plain" | "S256";
}>;

type WebAppParams = Partial<{
  access_type: "offline" | "online";
  include_granted_scopes: boolean;
  prompt: StrictUnion<"none" | Arrayable<"consent" | "select_account">>;
}>;
