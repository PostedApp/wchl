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

type ContentDetails = { itemCount: number };

export type Filter = OmitAuth<ListFilter>;

export function isPlaylist<P extends Part>(
  item: any,
  parts?: P
): item is Playlist<P> {
  return (
    item?.kind === "youtube#playlist" &&
    (parts === undefined || arrayed(parts).every((part) => part in item))
  );
}

type ListFilter = StrictUnion<
  WithAuth<{ channelId: string } | { id: string } | Oauth<{ mine: boolean }>>
>;

type ListOptional = Partial<
  Record<
    | "hl"
    | "onBehalfOfContentOwner"
    | "onBehalfOfContentOwnerChannel"
    | "pageToken",
    string
  > & { maxResults: OneToFiftyInclusive }
>;

export type ListParameters<P extends Part> = Merge<ListFilter, ListPartials<P>>;

export type ListPartials<P extends Part> = {
  part?: P;
} & ListOptional;

export type Localizations = {
  [key: string]: Record<"title" | "description", string>;
};

export enum PartCost {
  contentDetails = 2,
  id = 0,
  localizations = 2,
  player = 0,
  snippet = 2,
  status = 2,
}

export type Part = Arrayable<keyof Parts>;

type Parts = {
  contentDetails: ContentDetails;
  id: string;
  localizations: Localizations;
  player: Player;
  snippet: Snippet;
  status: Status;
};

type PartUnion<T> = T extends Array<keyof Parts> ? UnionizeTuple<T> : T;

type Player = { embedHtml: string };

export type Playlist<P extends Part> = MetaData<"youtube#playlist"> &
  Pick<Parts, PartUnion<P>>;

export type PlaylistListResponse<P extends Part> = PaginatedListResponse<
  "youtube#playlistListResponse",
  Playlist<P>
>;

export type Snippet = Record<
  | "channelId"
  | "channelTitle"
  | "defaultLanguage"
  | "description"
  | "publishedAt"
  | "title",
  string
> & {
  localized: Record<"description" | "title", string>;
  tags?: string[];
  thumbnails: Thumbnails;
};

export type Status = {
  embeddable?: boolean;
  privacyStatus: "private" | "public" | "unlisted";
};
