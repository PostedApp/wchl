import { Arrayable, arrayed, OneToFiftyInclusive } from "../_helpers";
import { StrictUnion, UnionizeProperties, UnionizeTuple } from "simplytyped";
import { Oauth, PaginatedListResponse, Thumbnails, WithAuth } from "../_core";

export const defaultType: Type = ["channel", "playlist", "video"];

export type ForContentOwner = {
  forContentOwner: boolean;
  onBehalfOfContentOwner: string;
} & Omit<ListOptional<"video">, keyof VideoProperties>;

export type ForDeveloper = { forDeveloper: boolean } & ListOptional<"video">;

export type ForMine = { forMine: boolean } & Omit<
  ListOptional<"video">,
  keyof VideoProperties
>;

export function isSearchResult<P extends Part, T extends Type>(
  item: any,
  types?: T,
  parts?: P
): item is SearchResult<P, T> {
  return (
    item?.kind === "youtube#searchResult" &&
    (types === undefined ||
      (item.id &&
        item.id.kind &&
        arrayed(types).includes(item.id.kind.slice(8)))) &&
    (parts === undefined || arrayed(parts).every((part) => part in item))
  );
}

type ListFilter<T extends Type> = StrictUnion<
  WithAuth<
    | Oauth<Partial<ForContentOwner | ForDeveloper | ForMine>>
    | Partial<RelatedToVideoId>
    | ListOptional<T>
  >
>;

type ListOptional<T extends Type> = Partial<
  Record<
    | "channelId"
    | "pageToken"
    | "publishedAfter"
    | "publishedBefore"
    | "q"
    | "regionCode"
    | "relevanceLanguage"
    | "videoCategoryId",
    string
  > & {
    channelType: "any" | "show";
    maxResults: OneToFiftyInclusive;
    order:
      | "date"
      | "rating"
      | "relevance"
      | "title"
      | "videoCount"
      | "viewCount";
    safeSearch: "moderate" | "none" | "strict";
  } & (T extends "video" ? VideoOptions : unknown)
> & { type: T };

export type ListParameters<P extends Part, T extends Type> = {
  part?: P;
} & ListFilter<T>;

export type ListPartials<P extends Part, T extends Type> = {
  part?: P;
} & ListOptional<T>;

export type Part = Arrayable<keyof Parts>;

export enum PartCost {
  snippet = 2, // NB: Presumed, not stated in api docs; sent feedback to rectify
}

type Parts<T extends Type = typeof defaultType> = {
  id: ResultId<T>;
  snippet: Snippet;
};

type PartUnion<T> = T extends Array<keyof Parts> ? UnionizeTuple<T> : T;

export type RelatedToVideoId = { relatedToVideoId: string } & Pick<
  ListOptional<"video">,
  | "maxResults"
  | "pageToken"
  | "regionCode"
  | "relevanceLanguage"
  | "safeSearch"
  | "type"
>;

type ResultId<T extends Type> = UnionizeProperties<
  Pick<
    {
      channel: {
        kind: "youtube#channel";
        channelId: string;
      };
      playlist: {
        kind: "youtube#playlist";
        playlistId: string;
      };
      video: {
        kind: "youtube#video";
        videoId: string;
      };
    },
    TypeUnion<T>
  >
>;

export type SearchListResponse<
  P extends Part,
  T extends Type
> = PaginatedListResponse<"youtube#searchListResponse", SearchResult<P, T>>;

export type SearchResult<P extends Part = Part, T extends Type = Type> = {
  etag: string;
  kind: "youtube#searchResult";
} & Pick<Parts<T>, PartUnion<P>>;

type Snippet = Record<
  | "channelId"
  | "channelTitle"
  | "description"
  | "liveBroadcastContent"
  | "publishedAt"
  | "title",
  string
> & {
  thumbnails: Thumbnails;
};

export type Type = Arrayable<Types>;

type Types = "channel" | "playlist" | "video";

type TypeUnion<T> = T extends Types[] ? UnionizeTuple<T> : T;

type VideoProperties = {
  videoCaption: "any" | "closedCaption" | "none";
  videoDefinition: "any" | "high" | "standard";
  videoDimension: "any" | "2d" | "3d";
  videoDuration: "any" | "long" | "medium" | "short";
  videoEmbeddable: "any" | "true";
  videoLicense: "any" | "creativeCommon" | "youtube";
  videoSyndicated: "any" | "true";
  videoType: "any" | "episode" | "movie";
};

type VideoOptions = Record<
  "location" | "locationRadius" | "videoCategoryId",
  string
> & {
  eventType: "completed" | "live" | "upcoming";
} & VideoProperties;
