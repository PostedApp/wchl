import { Arrayable, arrayed, OneToFiftyInclusive } from "../_helpers";
import { DeepPartial, Merge, StrictUnion, UnionizeTuple } from "simplytyped";
import {
  ListResponse,
  MetaData,
  Oauth,
  OmitAuth,
  PaginatedListResponse,
  Thumbnails,
  WithAuth,
} from "../_core";

export type AbuseReport = Required<Record<"videoId" | "reasonId", string>> &
  Partial<Record<"comments" | "language" | "secondaryReasonId", string>>;

type ContentDetails = Record<
  "dimension" | "duration" | "projection",
  string
> & {
  caption: "false" | "true";
  definition: "hd" | "sd";
  licensedContent: boolean;
};

type FileDetails = Record<"bitrateBps" | "durationMs" | "fileSize", number> &
  Record<"container" | "creationTime" | "fileName" | "fileType", string> & {
    audioStreams: Array<
      Record<"bitrateBps" | "channelCount", number> &
        Record<"codec" | "vendor", string>
    >;
    videoStreams: Array<
      Record<
        | "aspectRatio"
        | "bitrateBps"
        | "frameRateFps"
        | "heightPixels"
        | "widthPixels",
        number
      > &
        Record<"codec" | "rotation" | "vendor", string>
    >;
  };

export type Filter = OmitAuth<ListFilter>;

export type GetRatingParameters = { id: Arrayable<string> } & Partial<{
  onBehalfOfContentOwner: string;
}>;

export type InsertOptional = Pick<ListOptional, "onBehalfOfContentOwner"> &
  DeepPartial<
    Record<"autoLevels" | "notifySubscribers" | "stabilize", boolean> & {
      onBehalfOfContentOwnerChannel: string;
    }
  >;

export function isVideo<P extends Part>(
  item: any,
  parts?: P
): item is Video<P> {
  return (
    item?.kind === "youtube#video" &&
    (parts === undefined || arrayed(parts).every((part) => part in item))
  );
}

type ListFilter = StrictUnion<
  WithAuth<
    | { chart: "mostPopular" }
    | { id: Arrayable<string> }
    | Oauth<{ myRating: "dislike" | "like" }>
  >
>;

type ListOptional = Partial<
  Record<"maxHeight" | "maxWidth", number> &
    Record<
      | "hl"
      | "onBehalfOfContentOwner"
      | "pageToken"
      | "regionCode"
      | "videoCategoryId",
      string
    > & {
      maxResults: OneToFiftyInclusive;
    }
>;

export type ListParameters<P extends Part> = Merge<ListFilter, ListPartials<P>>;

export type ListPartials<P extends Part> = {
  part?: P;
} & ListOptional;

type LiveStreamingDetails = Record<
  | "actualStartTime"
  | "actualEndTime"
  | "scheduledStartTime"
  | "scheduledEndTime"
  | "activeLiveChatId",
  string
> & {
  concurrentViewers: number;
};

export type Localizations = {
  [key: string]: Record<"description" | "title", string>;
};

export type Part = Arrayable<keyof Parts>;

export enum PartCost {
  contentDetails = 2,
  fileDetails = 1,
  id = 0,
  liveStreamingDetails = 2,
  localizations = 2,
  player = 0,
  processingDetails = 1,
  recordingDetails = 2,
  snippet = 2,
  statistics = 2,
  status = 2,
  suggestions = 1,
  topicDetails = 2,
}

type Parts = {
  contentDetails: ContentDetails;
  fileDetails: FileDetails;
  id: string;
  liveStreamingDetails: LiveStreamingDetails;
  localizations: Localizations;
  player: Player;
  processingDetails: ProcessingDetails;
  recordingDetails: RecordingDetails;
  snippet: Snippet;
  statistics: Statistics;
  status: Status;
  suggestions: Suggestions;
  topicDetails: TopicDetails;
};

type PartUnion<T> = T extends Array<keyof Parts> ? UnionizeTuple<T> : T;

type Player = Record<"embedHeight" | "embedWidth", number> & {
  embedHtml: string;
};

type ProcessingDetails = Record<
  | "editorSuggestionsAvailability"
  | "fileDetailsAvailability"
  | "processingFailureReason"
  | "processingIssuesAvailability"
  | "processingStatus"
  | "tagSuggestionsAvailability"
  | "thumbnailsAvailability",
  string
> & {
  processingProgress: Record<
    "partsProcessed" | "partsTotal" | "timeLeftMs",
    number
  >;
};

type RecordingDetails = {
  recordingDate: string;
};

export type Snippet = Record<
  | "categoryId"
  | "channelId"
  | "channelTitle"
  | "defaultAudioLanguage"
  | "defaultLanguage"
  | "description"
  | "publishedAt"
  | "title",
  string
> & {
  liveBroadcastContent: "live" | "none" | "upcoming";
  localized: Record<"description" | "title", string>;
  tags?: string[];
  thumbnails: Thumbnails;
};

type Statistics = Record<
  "commentCount" | "dislikeCount" | "favoriteCount" | "likeCount" | "viewCount",
  number
>;

export type Status = Record<
  "embeddable" | "madeForKids" | "publicStatsViewable",
  boolean
> &
  Record<
    | "failureReason"
    | "license"
    | "privacyStatus"
    | "publishAt"
    | "rejectionReason"
    | "uploadStatus",
    string
  > & { selfDeclaredMadeForKids?: boolean };

type Suggestions = Record<
  | "editorSuggestions"
  | "processingErrors"
  | "processingHints"
  | "processingWarnings",
  string[]
> & {
  tagSuggestions: Array<{ tag: string; categoryRestricts: string[] }>;
};

type TopicDetails = Record<
  "relevantTopicIds" | "topicCategories" | "topicIds",
  string[]
>;

export type Video<P extends Part> = MetaData<"youtube#video"> &
  Pick<Parts, PartUnion<P>>;

export type VideoGetRatingResponse = ListResponse<
  "youtube#videoGetRatingResponse",
  Record<"videoId" | "rating", string>
>;

export type VideoListResponse<P extends Part> = PaginatedListResponse<
  "youtube#videoListResponse",
  Video<P>
>;
