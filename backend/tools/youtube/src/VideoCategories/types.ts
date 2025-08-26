import { Arrayable, arrayed } from "../_helpers";
import { Merge, StrictUnion, UnionizeTuple } from "simplytyped";
import { MetaData, OmitAuth, PaginatedListResponse, WithAuth } from "../_core";

export type Filter = OmitAuth<ListFilter>;

export function isVideoCategory<P extends Part>(
  item: any,
  parts?: P
): item is VideoCategory<P> {
  return (
    item?.kind === "youtube#videoCategory" &&
    (parts === undefined || arrayed(parts).every((part) => part in item))
  );
}

type ListFilter = StrictUnion<
  WithAuth<{ id: Arrayable<string> } | { regionCode: string }>
>;

type ListOptional = Partial<{ hl: string }>;

export type ListParameters<P extends Part | string = string> = Merge<
  ListFilter,
  ListPartials<P>
>;

export type ListPartials<P extends Part | string = string> = {
  part?: P;
} & ListOptional;

export type Part = Arrayable<keyof Parts>;

export enum PartCost {
  snippet = 2,
}

type Parts = {
  id: string;
  snippet: Snippet;
};

type PartUnion<T> = T extends Array<keyof Parts> ? UnionizeTuple<T> : T;

type Snippet = Record<"channelId" | "title", string> & {
  assignable: boolean;
};

export type VideoCategory<P extends Part> = MetaData<"youtube#videoCategory"> &
  Pick<Parts, PartUnion<P>>;

export type VideoCategoryListResponse<P extends Part> = PaginatedListResponse<
  "youtube#videoCategoryListResponse",
  VideoCategory<P>
>;
