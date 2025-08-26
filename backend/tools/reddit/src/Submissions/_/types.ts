import { Arrayable } from "../../_helpers";
import { StrictUnion } from "simplytyped";
import { Comment, Link, ListingResponse, Subreddit } from "../../_core";

export type Params = {
  info: StrictUnion<
    | {
        id: Arrayable<string>;
      }
    | {
        url: string;
      }
  >;
  saved_categories: {};
};

export type Response = {
  info: ListingResponse<Comment | Link | Subreddit>;
  saved_categories: unknown;
};
