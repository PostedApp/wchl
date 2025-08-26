import {
  AnyParams,
  Arrayable,
  arrayed,
  ArrayRange,
  Cached,
  Nullable,
  OneToHundredInclusive,
} from "../_helpers";
import { DeepPartial, Omit, StrictUnion } from "simplytyped";
import { popSlash } from "./utils";

export type AccessToken<S extends Arrayable<Scopes> = any> = Cached & {
  token: {
    _ratelimit?: RateLimit;
    _grant?: Record<"client_id" | "refresh_token", string> & {
      client_secret?: string;
      expiry_date: number;
    };
    _scopes?: S;
    access_token: string;
    userAgent?: string;
  };
};

export type Account = KindResponse<
  "t2",
  Record<
    | "has_subscribed"
    | "has_verified_email"
    | "hide_from_robots"
    | "is_employee"
    | "is_friend"
    | "is_gold"
    | "is_mod"
    | "pref_show_snoovatar"
    | "verified",
    boolean
  > &
    Record<"comment_karma" | "created" | "created_utc" | "link_karma", number> &
    Record<"icon_img" | "id" | "name", string> & {
      subreddit: Record<
        | "default_set"
        | "disable_contributor_requests"
        | "free_form_reports"
        | "is_default_banner"
        | "is_default_icon"
        | "link_flair_enabled"
        | "over_18"
        | "restrict_commenting"
        | "restrict_posting"
        | "show_media"
        | "user_is_banned"
        | "user_is_contributor"
        | "user_is_moderator"
        | "user_is_muted"
        | "user_is_subscriber",
        boolean
      > &
        Record<
          | "banner_img"
          | "community_icon"
          | "description"
          | "display_name"
          | "display_name_prefixed"
          | "header_img"
          | "icon_color"
          | "icon_img"
          | "key_color"
          | "link_flair_position"
          | "name"
          | "primary_color"
          | "public_description"
          | "title"
          | "url",
          string
        > &
        Record<
          "banner_size" | "header_size" | "icon_size",
          [number, number]
        > & {
          subreddit_type: "user";
          subscribers: 0;
        };
    }
>;

export type AuthorizeParams = Record<"client_id" | "redirect_uri", string> & {
  duration: "permanent" | "temporary";
  response_type: "code";
  scope: Arrayable<Scopes>;
  state?: string;
};

type Awardings = Record<
  | "coin_price"
  | "coin_reward"
  | "count"
  | "days_of_drip_extension"
  | "days_of_premium"
  | "icon_height"
  | "icon_width",
  number
> &
  Record<
    "award_type" | "description" | "icon_url" | "id" | "name" | "subreddit_id",
    string
  > & {
    is_enabled: true;
    resized_icons: Thumbnail[];
  };

export type Comment<
  isThreaded extends boolean = false,
  showMore extends boolean = false
> = KindResponse<
  "t1",
  Nullable<
    Submission &
      Record<
        "body" | "body_html" | "collapsed_reason" | "link_id" | "parent_id",
        string
      > &
      Record<
        "archived" | "collapsed" | "is_submitter" | "score_hidden",
        boolean
      > &
      Record<"controversiality" | "depth", number> & {
        replies: isThreaded extends true
          ? showMore extends true
            ? Array<
                ListingResponse<Comment<isThreaded, showMore> | CommentMore>
              >
            : Array<ListingResponse<Comment<isThreaded, showMore>>>
          : "";
      }
  >
>;

export type CommentMore = KindResponse<
  "more",
  Record<"count" | "depth", number> &
    Record<"id" | "name" | "parent_id", string> & {
      children: string[];
    }
>;

type Collection = Record<"created_at_utc" | "last_update_utc", number> &
  Record<
    | "author_id"
    | "author_name"
    | "collection_id"
    | "description"
    | "permalink"
    | "subreddit_id"
    | "title",
    string
  > & {
    display_layout: unknown;
    link_ids: string[];
  };

export type GrantParams = StrictUnion<
  | (Record<"code" | "redirect_uri", string> & {
      grant_type: "authorization_code";
    })
  | (Record<"password" | "username", string> & { grant_type: "password" })
  | { grant_type: "refresh_token"; refresh_token: string }
> & {
  client_id: string;
  client_secret?: string;
};

export type GrantResponse = Record<"access_token" | "scope", string> & {
  expires_in: number;
  refresh_token?: string;
  token_type: "bearer";
};

export function isComment(item: any): item is Comment {
  return item?.kind === "t1";
}

export function isKindResponse<K extends string>(
  item: any,
  kind?: K
): item is KindResponse<K> {
  return kind === undefined || item?.kind === kind;
}

export function isLink(item: any): item is Link {
  return item?.kind === "t3";
}

export function isListingResponse<K extends keyof Types>(
  item: any,
  kind?: Arrayable<K>
): item is ListingResponse<Types[K]> {
  return (
    item?.kind === "Listing" &&
    (kind === undefined ||
      (item as ListingResponse<Types[K]>)?.data?.children?.every?.(
        (child: any) => arrayed(kind).includes(child?.kind)
      ))
  );
}

export function isSubreddit(
  item: any,
  displayName?: string
): item is Subreddit {
  return (
    item?.kind === "t5" &&
    (displayName === undefined ||
      (item as Subreddit)?.data?.display_name === popSlash(displayName))
  );
}

export type KindResponse<Kind extends string, Data = any> = {
  data: Data;
  kind: Kind;
};

export type Link = KindResponse<
  "t3",
  Nullable<
    Submission &
      Record<
        | "allow_live_comments"
        | "archived"
        | "clicked"
        | "contest_mode"
        | "hidden"
        | "hide_score"
        | "is_crosspostable"
        | "is_meta"
        | "is_original_content"
        | "is_self"
        | "is_reddit_media_domain"
        | "is_robot_indexable"
        | "is_video"
        | "media_only"
        | "over_18"
        | "pinned"
        | "quarantine"
        | "spoiler"
        | "visited",
        boolean
      > &
      Record<
        | "num_comments"
        | "num_crossposts"
        | "num_duplicates"
        | "pwls"
        | "subreddit_subscribers"
        | "thumbnail_height"
        | "thumbnail_width"
        | "upvote_ratio"
        | "view_count"
        | "wls",
        number
      > &
      Record<
        | "category"
        | "domain"
        | "link_flair_background_color"
        | "link_flair_css_class"
        | "link_flair_text"
        | "link_flair_text_color"
        | "link_flair_type"
        | "parent_whitelist_status"
        | "selftext"
        | "selftext_html"
        | "thumbnail"
        | "title"
        | "url"
        | "whitelist_status",
        string
      > & {
        collections?: Collection[];
        content_categories: string[];
        discussion_type: "CHAT";
        link_flair_richtext: RichTextFlair;
        media: Partial<Media>;
        media_embed: Partial<MediaEmbed>;
        post_hint?: "hosted:video" | "image" | "link" | "rich:video" | "self";
        preview?: {
          enabled: boolean;
          images: [
            ImagesPreview & {
              id: string;
              variants:
                | Partial<
                    Record<"gif" | "mp4" | "nsfw" | "obfuscated", ImagesPreview>
                  >
                | {};
            }
          ];
        };
        secure_media: Partial<Media>;
        secure_media_embed: Partial<
          MediaEmbed & {
            media_domain_url: string;
          }
        >;
        sr_detail?: SrDetail;
        suggested_sort: "blank" | Sort;
      }
  >
>;

type ImagesPreview = { source: Thumbnail; resolutions: Thumbnail[] };

export type ListingRequest = Partial<
  StrictUnion<{ after: string } | { before: string }> & {
    count: number;
    limit: OneToHundredInclusive;
    show?: string | "all";
  }
>;

export type ListingResponse<T = any, N extends number = number> = Pagination &
  KindResponse<
    "Listing",
    Nullable<{
      dist: number;
    }> & { children: ArrayRange<T, N>; is_truncated?: boolean; modhash: string }
  >;

type Media = StrictUnion<
  | Oembed
  | {
      reddit_video: Record<"duration" | "height", number> &
        Record<
          | "dash_url"
          | "fallback_url"
          | "hls_url"
          | "scrubber_media_url"
          | "transcoding_status",
          string
        > & {
          is_gif: boolean;
        };
    }
> & {
  type: string;
};

type MediaEmbed = Size & {
  content: string;
  scrolling: boolean;
};

export type MetaData<T extends string> = Record<"etag" | "id", string> & {
  kind: T;
};

type Oembed = {
  oembed: Size &
    Record<"thumbnail_height" | "thumbnail_width", number> &
    Record<
      | "html"
      | "provider_name"
      | "provider_url"
      | "thumbnail_url"
      | "title"
      | "version",
      string
    > &
    Partial<Record<"author_name" | "author_url" | "description", string>> & {
      type: "rich" | "video";
    };
};

export type Pagination = DeepPartial<{
  data: Record<"after" | "before", string>;
}>;

export type Query<T = AnyParams, A extends AccessToken = AccessToken> = {
  endpoint: string;
  params: T & A;
};

export type RateLimit = Record<
  "x-ratelimit-remaining" | "x-ratelimit-reset" | "x-ratelimit-used",
  number
>;

export type RichTextFlair = Array<
  Partial<Record<"a" | "t" | "u", string>> & { e: "emoji" | "text" }
>;

export type Scopes =
  | "account"
  | "creddits"
  | "edit"
  | "flair"
  | "history"
  | "identity"
  | "livemanage"
  | "modconfig"
  | "modcontributors"
  | "modflair"
  | "modlog"
  | "modmail"
  | "modothers"
  | "modposts"
  | "modself"
  | "modtraffic"
  | "modwiki"
  | "mysubreddits"
  | "privatemessages"
  | "read"
  | "report"
  | "save"
  | "structuredstyles"
  | "submit"
  | "subscribe"
  | "vote"
  | "wikiedit"
  | "wikiread";

export type Size = Record<"height" | "width", number>;

export type Sort =
  | "confidence"
  | "controversial"
  | "live"
  | "new"
  | "old"
  | "qa"
  | "random"
  | "top";

type SrDetail = Record<
  | "default_set"
  | "disable_contributor_requests"
  | "free_form_reports"
  | "link_flair_enabled"
  | "over_18"
  | "restrict_commenting"
  | "restrict_posting"
  | "show_media"
  | "user_is_banned"
  | "user_is_contributor"
  | "user_is_moderator"
  | "user_is_muted"
  | "user_is_subscriber",
  boolean
> &
  Record<"banner_size" | "header_size" | "icon_size", [number, number]> &
  Record<
    | "display_name"
    | "display_name_prefixed"
    | "header_img"
    | "icon_color"
    | "icon_img"
    | "key_color"
    | "link_flair_position"
    | "name"
    | "primary_color"
    | "public_description"
    | "submit_link_label"
    | "submit_text_label"
    | "subreddit_type"
    | "title"
    | "url",
    string
  > & {
    subscribers: number;
  };

type Submission = Record<
  | "author_patreon_flair"
  | "can_gild"
  | "can_mod_post"
  | "likes"
  | "locked"
  | "no_follow"
  | "saved"
  | "send_replies"
  | "stickied",
  boolean
> &
  Record<
    | "approved_at_utc"
    | "banned_at_utc"
    | "created"
    | "created_utc"
    | "downs"
    | "edited"
    | "gilded"
    | "num_reports"
    | "score"
    | "total_awards_received"
    | "ups",
    number
  > &
  Record<
    | "approved_by"
    | "author"
    | "author_flair_background_color"
    | "author_flair_css_class"
    | "author_flair_template_id"
    | "author_flair_text"
    | "author_flair_text_color"
    | "author_flair_type"
    | "author_fullname"
    | "banned_by"
    | "id"
    | "mod_note"
    | "mod_reason_by"
    | "mod_reason_title"
    | "name"
    | "permalink"
    | "removal_reason"
    | "subreddit"
    | "subreddit_id"
    | "subreddit_name_prefixed"
    | "subreddit_type",
    string
  > &
  Record<"mod_reports" | "report_reasons" | "user_reports", string[]> & {
    all_awardings: Awardings[];
    author_flair_richtext: RichTextFlair;
    distinguished: "admin" | "moderator";
    gildings: Record<"gid_1" | "gid_2" | "gid_3", number>;
  };

export type Subreddit = {
  data: Nullable<
    Omit<SrDetail, "default_set" | "icon_color" | "over_18"> &
      Record<
        | "accounts_active_is_fuzzed"
        | "all_original_content"
        | "allow_discovery"
        | "allow_images"
        | "allow_videogifs"
        | "allow_videos"
        | "can_assign_link_flair"
        | "can_assign_user_flair"
        | "collapse_deleted_comments"
        | "emojis_enabled"
        | "has_menu_widget"
        | "hide_ads"
        | "is_enrolled_in_new_modmail"
        | "original_content_tag_enabled"
        | "over18"
        | "public_traffic"
        | "quarantine"
        | "show_media_preview"
        | "spoilers_enabled"
        | "user_can_flair_in_sr"
        | "user_flair_enabled_in_sr"
        | "user_has_favorited"
        | "user_sr_flair_enabled"
        | "user_sr_theme_enabled"
        | "wiki_enabled",
        boolean
      > &
      Record<
        | "accounts_active"
        | "active_user_count"
        | "comment_score_hide_mins"
        | "created"
        | "created_utc"
        | "emojis_custom_size"
        | "wls",
        number
      > &
      Record<
        | "advertiser_category"
        | "banner_background_color"
        | "banner_background_image"
        | "banner_img"
        | "community_icon"
        | "description"
        | "description_html"
        | "id"
        | "lang"
        | "mobile_banner_image"
        | "notification_level"
        | "public_description_html"
        | "submission_type"
        | "submit_text"
        | "submit_text_html"
        | "suggested_comment_sort"
        | "user_flair_background_color"
        | "user_flair_css_class"
        | "user_flair_position"
        | "user_flair_template_id"
        | "user_flair_text"
        | "user_flair_text_color"
        | "user_flair_type"
        | "whitelist_status",
        string
      > & {
        user_flair_richtext: RichTextFlair;
      }
  >;
  kind: "t5";
};

export type Thumbnail = Record<"height" | "width", number> & {
  url: string;
};

export type Thumbnails = Record<"default" | "high" | "medium", Thumbnail> &
  Partial<Record<"standard" | "maxres", Thumbnail>>;

export type Types = {
  t1: Comment;
  t2: Account;
  t3: Link;
  t4: unknown;
  t5: Subreddit;
  t6: unknown;
};

export type User = Record<"id" | "name" | "rel_id", string> & {
  date: number;
};

export type UserList<Extra extends object = {}> = KindResponse<
  "UserList",
  {
    children: Array<User & Extra>;
  }
>;

export type WithAuth<
  T extends object = {},
  S extends Arrayable<Scopes> = any
> = T & AccessToken<S>;
