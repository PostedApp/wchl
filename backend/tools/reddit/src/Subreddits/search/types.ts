import { ListingRequest } from "../../_core";

export type Params = Partial<
  ListingRequest &
    Record<"include_facets" | "restrict_sr" | "sr_detail", boolean> &
    Record<"category" | "q", string> & {
      sort: "comments" | "hot" | "new" | "relevance" | "top";
      t: "all" | "day" | "hour" | "month" | "week" | "year";
      type?: "link" | "sr" | "user";
    }
>;
