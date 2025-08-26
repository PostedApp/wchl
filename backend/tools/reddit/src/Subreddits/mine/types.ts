import { ListingRequest } from "../../_core";

export type Moderators = {
  data: {
    children: User &
      Record<"author_flair_css_class" | "author_flair_text", string> & {
        mod_permissions: string[];
      };
  };
  kind: "UserList";
};

export type Params = Partial<
  ListingRequest & Record<"include_categories" | "sr_detail", boolean>
>;

export type Routes =
  | ""
  | "contributor"
  | "mine"
  | "moderator"
  | "streams"
  | "subscriber";

type User = Record<"id" | "name" | "rel_id", string> & {
  date: number;
};
