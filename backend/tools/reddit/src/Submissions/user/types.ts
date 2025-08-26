import { Merge } from "simplytyped";
import { Comment, Link, ListingRequest, ListingResponse } from "../../_core";

export type Params = Partial<
  Merge<
    ListingRequest,
    Record<"include_categories", boolean> & {
      context: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
      show: "given";
      sort: "controversial" | "hot" | "new" | "top";
      sr_detail?: boolean;
      t: "all" | "day" | "hour" | "month" | "year";
      type: "comments" | "links";
    }
  >
>;

export type Response = Record<
  "downvoted" | "hidden" | "submitted" | "upvoted",
  ListingResponse<Link>
> &
  Record<
    "" | "gilded" | "overview" | "saved",
    ListingResponse<Comment | Link>
  > & {
    comments: ListingResponse<Comment>;
  };
