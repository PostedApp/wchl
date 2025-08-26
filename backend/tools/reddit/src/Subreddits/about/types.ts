import { ListingResponse, Subreddit, User, UserList } from "../../_core";

type Banned = ListingResponse<
  User & {
    days_left: number;
  }
>;

type ComplaintStep = Record<
  | "complaintButtonText"
  | "complaintPageTitle"
  | "complaintPrompt"
  | "complaintUrl",
  string
> & {
  fileComplaint: boolean;
};

export type Moderators = UserList<
  Record<"author_flair_css_class" | "author_flair_text", string> & {
    mod_permissions: string[];
  }
>;

export type Response = Record<"banned" | "wikibanned", Banned> &
  Record<
    "contributors" | "muted" | "wikicontributors",
    ListingResponse<User>
  > & {
    "": Subreddit;
    moderators: Moderators;
    rules: Rules;
  };

export type Routes = keyof Response;

type Rules = {
  rules: Array<
    Record<"created_utc" | "priority", number> &
      Record<
        "description" | "description_html" | "short_name" | "violation_reason",
        string
      > & {
        kind: "all" | "link" | "comments";
      }
  >;
  site_rules: string[];
  site_rules_flow: RulesFlow[];
};

type RulesFlow = Record<"reasonText" | "reasonTextToShow", string> & {
  nextStepHeader?: string;
  nextStepReasons?: Array<RulesFlow | (RulesFlow & ComplaintStep)>;
};
