import { Arrayable, arrayed, OneToFiftyInclusive } from "../_helpers";
import { Merge, StrictUnion, UnionizeTuple } from "simplytyped";
import {
  MetaData,
  Oauth,
  OmitAuth,
  PaginatedListResponse,
  Thumbnails,
  WithAuth,
} from "../_core";

type AuditDetails = Record<
  | "communityGuidelinesGoodStanding"
  | "contentIdClaimsGoodStanding"
  | "copyrightStrikesGoodStanding"
  | "overallGoodStanding",
  boolean
>;

type BrandingSettings = {
  channel: Record<
    "moderateComments" | "showBrowseView" | "showRelatedChannels",
    boolean
  > &
    Record<
      | "country"
      | "defaultLanguage"
      | "defaultTab"
      | "descriptions"
      | "featuredChannelsTitle"
      | "keywords"
      | "profileColor"
      | "title"
      | "trackingAnalyticsAccountId"
      | "unsubscribedTrailer",
      string
    > & {
      featuredChannelsUrls: string[];
    };
  watch: Record<"backgroundColor" | "featuredPlaylistId" | "textColor", string>;
};

export type Channel<P extends Part> = MetaData<"youtube#channel"> &
  Pick<Parts, PartUnion<P>>;

export type ChannelListResponse<P extends Part> = PaginatedListResponse<
  "youtube#channelListResponse",
  Channel<P>
>;

type ContentDetails = {
  relatedPlaylists: Record<
    "favorites" | "likes" | "uploads" | "watchHistory" | "watchLater",
    string
  >;
};

type ContentOwnerDetails = Record<"contentOwner" | "timeLinked", string>;

export type Filter = OmitAuth<ListFilter>;

export function isChannel<P extends Part>(
  item: any,
  parts?: P
): item is Channel<P> {
  return (
    item?.kind === "youtube#channel" &&
    (parts === undefined || arrayed(parts).every((part) => part in item))
  );
}

export type ListFilter = StrictUnion<
  WithAuth<
    | { forUsername: string }
    | { id: Arrayable<string> }
    | Oauth<{ managedByMe: boolean } | { mine: true }>
  >
>;

export type ListOptional = Partial<
  Record<"hl" | "pageToken", string> & {
    maxResults: OneToFiftyInclusive;
    onBehalfOfContentOwner: string;
  }
>;

export type ListParameters<P extends Part> = Merge<ListFilter, ListPartials<P>>;

export type ListPartials<P extends Part> = {
  part?: P;
} & ListOptional;

type Localizations = {
  [key: string]: Record<"description" | "title", string>;
};

export type Part = Arrayable<keyof Parts>;

export enum PartCost {
  auditDetails = 4,
  brandingSettings = 2,
  contentDetails = 2,
  contentOwnerDetails = 2,
  id = 0,
  invideoPromotion = 2,
  localizations = 2,
  snippet = 2,
  statistics = 2,
  status = 2,
  topicDetails = 2,
}

export type Parts = {
  auditDetails: AuditDetails;
  brandingSettings: BrandingSettings;
  contentDetails: ContentDetails;
  contentOwnerDetails: ContentOwnerDetails;
  id: string;
  localizations: Localizations;
  snippet: Snippet;
  statistics: Statistics;
  status: Status;
  topicDetails: TopicDetails;
};

type PartUnion<T> = T extends Array<keyof Parts> ? UnionizeTuple<T> : T;

type Snippet = Record<
  "customUrl" | "description" | "publishedAt" | "title",
  string
> & {
  localized: Record<"description" | "title", string>;
  thumbnails: Thumbnails;
};

type Statistics = Record<
  "subscriberCount" | "videoCount" | "viewCount",
  number
> & {
  hiddenSubscriberCount: boolean;
};

type Status = Record<"isLinked" | "madeForKids", boolean> &
  Record<"longUploadsStatus" | "privacyStatus", string> & {
    selfDeclaredMadeForKids?: boolean;
  };

type TopicDetails = Record<"topicCategories" | "topicIds", string[]>;

export type UpdateParts = Pick<
  Parts,
  "id" | "brandingSettings" | "localizations"
>;
