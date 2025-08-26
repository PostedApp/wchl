import { Arrayable, arrayed, OneToHundredInclusive } from "../_helpers";
import { Merge, StrictUnion, UnionizeTuple } from "simplytyped";
import { MetaData, OmitAuth, PaginatedListResponse, WithAuth } from "../_core";

export type Comment<P extends Part> = MetaData<"youtube#comment"> &
  Pick<Parts, PartUnion<P>>;

export type CommentListResponse<P extends Part> = PaginatedListResponse<
  "youtube#commentListResponse",
  Comment<P>
>;

export type Filter = OmitAuth<ListFilter>;

export function isComment<P extends Part>(
  item: any,
  parts?: P
): item is Comment<P> {
  return (
    item?.kind === "youtube#comment" &&
    (parts === undefined || arrayed(parts).every((part) => part in item))
  );
}

type ListFilter = StrictUnion<
  WithAuth<{ id: Arrayable<string> } | { parentId: string }>
>;

type ListOptional = Partial<
  Record<"pageToken" | "textFormat", string> & {
    maxResults: OneToHundredInclusive;
  }
>;

export type ListParameters<P extends Part> = Merge<ListFilter, ListPartials<P>>;

export type ListPartials<P extends Part> = {
  part?: P;
} & ListOptional;

export type Part = Arrayable<keyof Parts>;

export enum PartCost {
  id = 0,
  snippet = 1,
}

type Parts = {
  id: string;
  snippet: Snippet;
};

type PartUnion<T> = T extends Array<keyof Parts> ? UnionizeTuple<T> : T;

export type Snippet = Record<
  | "authorChannelUrl"
  | "authorDisplayName"
  | "authorProfileImageUrl"
  | "parentId"
  | "publishedAt"
  | "textDisplay"
  | "updatedAt",
  string
> & {
  authorChannelId?: { value: string };
  canRate: boolean;
  likeCount: number;
  textOriginal?: string;
  viewerRating: "like" | "none";
};
