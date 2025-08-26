import { Arrayable, Cached } from "../_helpers";
import { StrictUnion, UnionizeTuple } from "simplytyped";
import { defaultAuthScope } from "./utils";
export * from "./utils/authorize/types";

export type AccessToken<S extends Arrayable<Scopes> = any> = Cached & {
  token: {
    _grant?: Record<"client_id" | "refresh_token", string> & {
      client_secret?: string;
      expiry_date: number;
    };
    _scopes?: S;
    access_token: string;
  };
};

export type AnyAuth<T> = T & Authentication;

export type AnyParams = {
  [param: string]: any;
};

export type ApiKey = Cached & { key: string };

export type Authentication = StrictUnion<AccessToken | ApiKey>;

export type ListResponse<K = any, T = any> = {
  etag: string;
  items: T[];
  kind: K;
};

export type MetaData<T extends string> = Record<"etag" | "id", string> & {
  kind: T;
};

export type Oauth<T> = T & AccessToken;

export type OmitAuth<T> = Omit<T, keyof Authentication>;

export type PaginatedListResponse<K = any, T = any> = ListResponse<K, T> &
  PaginatedResponse;

export type PaginatedRequest = { pageToken: string };

export type PaginatedResponse = Partial<
  Record<"nextPageToken" | "prevPageToken", string>
> & {
  pageInfo: Record<"resultsPerPage" | "totalResults", number>;
};

export type Query<T = AnyParams, A extends Authentication = Authentication> = {
  endpoint: string;
  params: T & A;
};

export type Scopes =
  | "https://www.googleapis.com/auth/youtube"
  | "https://www.googleapis.com/auth/youtube.force-ssl"
  | "https://www.googleapis.com/auth/youtube.readonly"
  | "https://www.googleapis.com/auth/youtubepartner"
  | "https://www.googleapis.com/auth/youtubepartner-channel-audit"
  | UnionizeTuple<typeof defaultAuthScope>;

export type ScopeUnion<T> = T extends Scopes[] ? UnionizeTuple<T> : T;

export type Thumbnail = Record<"height" | "width", number> & {
  url: string;
};

export type Thumbnails = Record<"default" | "high" | "medium", Thumbnail> &
  Partial<Record<"standard" | "maxres", Thumbnail>>;

export type WithAuth<T> = T extends Authentication ? T : T & Authentication;
