import { Arrayable } from "../_helpers";
import { Account, KindResponse, ListingRequest, UserList } from "../_core";

type Features = Record<
  | "chat"
  | "chat_group_rollout"
  | "chat_reddar_reports"
  | "chat_rollout"
  | "chat_subreddit"
  | "chat_user_settings"
  | "community_awards"
  | "custom_feeds"
  | "do_not_track"
  | "dual_write_user_prefs"
  | "is_email_permission_required"
  | "mod_awards"
  | "modlog_copyright_removal"
  | "mweb_xpromo_interstitial_comments_android"
  | "mweb_xpromo_interstitial_comments_ios"
  | "mweb_xpromo_modal_listing_click_daily_dismissible_android"
  | "mweb_xpromo_modal_listing_click_daily_dismissible_ios"
  | "read_from_pref_service"
  | "richtext_previews"
  | "show_amp_link"
  | "spez_modal"
  | "twitter_embed",
  boolean
> &
  Record<
    | "default_srs_holdout"
    | "mweb_footer_upsell"
    | "mweb_nsfw_xpromo"
    | "mweb_sharing_clipboard"
    | "mweb_sharing_web_share_api"
    | "mweb_xpromo_revamp_v2"
    | "mweb_xpromo_revamp_v3"
    | "no_subscription_step"
    | "swap_steps_two_and_three_recalibration",
    Record<"owner" | "variant", string> & {
      experiment_id: number;
    }
  >;

type Fields =
  | "accept_pms"
  | "activity_relevant_ads"
  | "allow_clicktracking"
  | "beta"
  | "clickgadget"
  | "collapse_read_messages"
  | "compress"
  | "creddit_autorenew"
  | "default_comment_sort"
  | "domain_details"
  | "email_digests"
  | "email_messages"
  | "email_unsubscribe_all"
  | "enable_default_themes"
  | "geopopular"
  | "hide_ads"
  | "hide_downs"
  | "hide_from_robots"
  | "hide_ups"
  | "highlight_controversial"
  | "highlight_new_comments"
  | "ignore_suggested_sort"
  | "in_redesign_beta"
  | "label_nsfw"
  | "lang"
  | "legacy_search"
  | "live_orangereds"
  | "mark_messages_read"
  | "media"
  | "media_preview"
  | "min_comment_score"
  | "min_link_score"
  | "monitor_mentions"
  | "newwindow"
  | "nightmode"
  | "no_profanity"
  | "num_comments"
  | "numsites"
  | "organic"
  | "other_theme"
  | "over_18"
  | "private_feeds"
  | "profile_opt_out"
  | "public_votes"
  | "research"
  | "search_include_over_18"
  | "show_flair"
  | "show_gold_expiration"
  | "show_link_flair"
  | "show_promote"
  | "show_stylesheets"
  | "show_trending"
  | "show_twitter"
  | "store_visits"
  | "theme_selector"
  | "third_party_data_personalized_ads"
  | "third_party_site_data_personalized_ads"
  | "third_party_site_data_personalized_content"
  | "threaded_messages"
  | "threaded_modmail"
  | "top_karma_subreddits"
  | "use_global_defaults"
  | "video_autoplay";

type KarmaList = KindResponse<
  "KarmaList",
  Record<"comment_karma" | "link_karma", number> & {
    sr: string;
  }
>;

type Me = Omit<Account["data"], "is_friend"> &
  Record<
    | "can_create_subreddit"
    | "force_password_reset"
    | "has_android_subscription"
    | "has_external_account"
    | "has_gold_subscription"
    | "has_ios_subscription"
    | "has_paypal_subscription"
    | "has_stripe_subscription"
    | "has_subscribed_to_premium"
    | "has_visited_new_profile"
    | "in_beta"
    | "in_redesign_beta"
    | "is_sponsor"
    | "is_suspended"
    | "over_18"
    | "pref_autoplay"
    | "pref_nightmode"
    | "pref_no_profanity"
    | "pref_show_trending"
    | "pref_show_twitter"
    | "pref_top_karma_subreddits"
    | "pref_video_autoplay"
    | "seen_layout_switch"
    | "seen_premium_adblock_modal"
    | "seen_redesign_modal"
    | "seen_subreddit_chat_ftux",
    boolean
  > &
  Record<
    | "coins"
    | "gold_creddits"
    | "gold_expiration"
    | "inbox_count"
    | "num_friends"
    | "pref_clickgadget"
    | "suspension_expiration_utc",
    number
  > &
  Record<"oauth_client_id" | "pref_geopopular", string> & {
    features: Features;
    subreddit: Account["data"]["subreddit"] &
      Record<"submit_link_label" | "submit_text_label", string> & {
        coins: number;
      };
  };

export type Params = Record<"" | "karma" | "trophies", {}> &
  Record<
    Routes["List"],
    ListingRequest &
      Partial<Record<"include_categories" | "sr_detail", boolean>>
  > & {
    prefs: { fields: Arrayable<Fields> };
  };

export type Prefs = Record<
  | "activity_relevant_ads"
  | "allow_clicktracking"
  | "beta"
  | "clickgadget"
  | "collapse_left_bar"
  | "collapse_read_messages"
  | "compress"
  | "creddit_autorenew"
  | "domain_details"
  | "email_digests"
  | "email_messages"
  | "email_unsubscribe_all"
  | "enable_default_themes"
  | "hide_ads"
  | "hide_downs"
  | "hide_from_robots"
  | "hide_ups"
  | "highlight_controversial"
  | "highlight_new_comments"
  | "ignore_suggested_sort"
  | "label_nsfw"
  | "legacy_search"
  | "live_orangereds"
  | "mark_messages_read"
  | "monitor_mentions"
  | "newwindow"
  | "nightmode"
  | "no_profanity"
  | "organic"
  | "over_18"
  | "private_feeds"
  | "profile_opt_out"
  | "public_server_seconds"
  | "public_votes"
  | "research"
  | "search_include_over_18"
  | "show_flair"
  | "show_gold_expiration"
  | "show_link_flair"
  | "show_promote"
  | "show_snoovatar"
  | "show_stylesheets"
  | "show_trending"
  | "show_twitter"
  | "store_visits"
  | "third_party_data_personalized_ads"
  | "third_party_site_data_personalized_ads"
  | "third_party_site_data_personalized_content"
  | "threaded_messages"
  | "threaded_modmail"
  | "top_karma_subreddits"
  | "use_global_defaults"
  | "video_autoplay",
  boolean
> &
  Record<
    | "layout"
    | "min_comment_score"
    | "min_link_score"
    | "num_comments"
    | "numsites",
    number
  > &
  Record<"geopopular" | "lang" | "media" | "media_preview", string> & {
    accept_pms: "everyone" | "whitelisted";
    default_comment_sort:
      | "best"
      | "controversial"
      | "new"
      | "old"
      | "qa"
      | "top";
    default_theme_sr: unknown;
  };

export type Response = Record<"friends" | "prefs/blocked", UserList> & {
  "": Me;
  blocked: unknown;
  karma: KarmaList;
  prefs: Prefs;
  "prefs/friends": [Response["friends"], UserList];
  "prefs/messaging": [Response["prefs/blocked"], Response["prefs/trusted"]];
  "prefs/trusted": UserList;
  trophies: KindResponse<"TrophyList", { trophies: Trophies[] }>;
};

export type Routes = {
  Get: "" | "karma" | "prefs" | "trophies";
  List:
    | "blocked"
    | "friends"
    | "prefs/blocked"
    | "prefs/friends"
    | "prefs/messaging"
    | "prefs/trusted";
};

type Trophies = KindResponse<
  "t6",
  Record<
    "award_id" | "description" | "icon_40" | "icon_70" | "id" | "name" | "url",
    string
  >
>;
