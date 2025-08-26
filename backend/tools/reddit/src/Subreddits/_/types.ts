import { ListingRequest } from "../../_core";

export type Params = Partial<
  ListingRequest &
    Record<"include_categories" | "sr_detail", boolean> & {
      user: string;
    }
>;

export type Routes = {
  subreddits: "default" | "gold" | Routes["users"];
  users: "" | "new" | "popular";
};
