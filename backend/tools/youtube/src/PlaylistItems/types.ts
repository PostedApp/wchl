import { Arrayable, arrayed, OneToFiftyInclusive } from "../_helpers";
import { Merge, StrictUnion, UnionizeTuple } from "simplytyped";
import {
  MetaData,
  OmitAuth,
  PaginatedListResponse,
  Thumbnails,
  WithAuth,
} from "../_core";

export type ContentDetails = Record<
  "endAt" | "note" | "startAt" | "videoId",
  string
> & {
  videoPublishedAt?: string;
};

export type Filter = OmitAuth<ListFilter>;

export function isPlaylistItem<P extends Part>(
  item: any,
  parts?: P
): item is PlaylistItem<P> {
  return (
    item?.kind === "youtube#playlistItem" &&
    (parts === undefined || arrayed(parts).every((part) => part in item))
  );
}

type ListFilter = StrictUnion<
  WithAuth<{ id: string } | { playlistId: string }>
>;

type ListOptional = Partial<
  Record<"onBehalfOfContentOwner" | "pageToken" | "videoId", string> & {
    maxResults: OneToFiftyInclusive;
  }
>;

export type ListParameters<P extends Part> = Merge<ListFilter, ListPartials<P>>;

export type ListPartials<P extends Part> = {
  part?: P;
} & ListOptional;

export type Part = Arrayable<keyof Parts>;

export enum PartCost {
  contentDetails = 2,
  id = 0,
  snippet = 2,
  status = 2,
}

type Parts = {
  contentDetails: ContentDetails;
  id: string;
  snippet: Snippet;
  status: Status;
};

type PartUnion<T> = T extends Array<keyof Parts> ? UnionizeTuple<T> : T;

export type Snippet = Record<
  | "channelId"
  | "channelTitle"
  | "description"
  | "playlistId"
  | "publishedAt"
  | "title",
  string
> & {
  position: number;
  resourceId: Record<"kind" | "videoId", string>;
  thumbnails: Thumbnails;
};

type Status = {
  embeddable?: boolean;
  privacyStatus: "private" | "public" | "unlisted";
};

export type PlaylistItem<P extends Part> = MetaData<"youtube#playlistItem"> &
  Pick<Parts, PartUnion<P>>;

export type PlaylistItemListResponse<P extends Part> = PaginatedListResponse<
  "youtube#playlistItemListResponse",
  PlaylistItem<P>
>;
