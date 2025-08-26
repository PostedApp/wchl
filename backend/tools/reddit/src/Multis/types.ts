import { Nullable } from "../_helpers";
import { KindResponse } from "../_core";

export type LabeledMulti = KindResponse<
  "LabeledMulti",
  Record<"can_edit" | "is_favorited" | "is_subscriber" | "over_18", boolean> &
    Record<"created" | "created_utc" | "num_subscribers", number> &
    Record<
      | "description_html"
      | "description_md"
      | "display_name"
      | "icon_url"
      | "name"
      | "owner"
      | "owner_id"
      | "path",
      string
    > &
    Nullable<Record<"copied_from" | "key_color", string>> & {
      subreddits: Array<{ name: string }>;
      visibility: "hidden" | "private" | "public";
    }
>;

export type Params = {
  expand_srs?: boolean;
  username?: string;
};
