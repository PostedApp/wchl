import { Arrayable, arrayed, OneToHundredInclusive } from "../_helpers";
import { Merge, StrictUnion, UnionizeTuple } from "simplytyped";
import { Comment, Part as CommentPart } from "../Comments/types";
import { MetaData, OmitAuth, PaginatedListResponse, WithAuth } from "../_core";

export type CommentThread<P extends Part> = MetaData<"youtube#commentThread"> &
  Pick<Parts, PartUnion<P>>;

export type CommentThreadListResponse<P extends Part> = PaginatedListResponse<
  "youtube#commentThreadListResponse",
  CommentThread<P>
>;

export type Filter = OmitAuth<ListFilter>;

export function isCommentThread<P extends Part>(
  item: any,
  parts?: P
): item is CommentThread<P> {
  return (
    item?.kind === "youtube#commentThread" &&
    (parts === undefined || arrayed(parts).every((part) => part in item))
  );
}

type ListFilter = StrictUnion<
  WithAuth<
    | { allThreadsRelatedToChannelId: string }
    | { channelId: string }
    | { id: Arrayable<string> }
    | { videoId: string }
  >
>;

type ListOptional = Partial<
  Record<"pageToken" | "searchTerms", string> & {
    maxResults: OneToHundredInclusive;
    moderationStatus: "heldForReview" | "likelySpam" | "published";
    order: "relevance" | "time";
    textFormat: "html" | "plainText";
  }
>;

export type ListParameters<P extends Part> = Merge<ListFilter, ListPartials<P>>;

export type ListPartials<P extends Part> = {
  part?: P;
} & ListOptional;

export type Part = Arrayable<keyof Parts>;

export enum PartCost {
  id = 0,
  replies = 2,
  snippet = 2,
}

type Parts = {
  id: string;
  replies: Replies;
  snippet: Snippet;
};

type PartUnion<T> = T extends Array<keyof Parts> ? UnionizeTuple<T> : T;

type Replies = Partial<{ comments: Array<Comment<CommentPart>> }>;

export type Snippet = Record<"canReply" | "isPublic", boolean> & {
  channelId: string;
  topLevelComment: Comment<CommentPart>;
  totalReplyCount: number;
  videoId?: string;
};
