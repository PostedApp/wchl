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

type ContentDetails = Record<"newItemCount" | "totalItemCount", number> & {
  activityType: "all" | "uploads";
};

export type Filter = OmitAuth<ListFilter>;

export function isSubscription<P extends Part>(
  item: any,
  parts?: P
): item is Subscription<P> {
  return (
    item?.kind === "youtube#subscription" &&
    (parts === undefined || arrayed(parts).every((part) => part in item))
  );
}

type ListFilter = StrictUnion<
  WithAuth<
    | { channelId: string }
    | { id: Arrayable<string> }
    | Oauth<
        | { mine: true }
        | { myRecentSubscribers: boolean }
        | { mySubscribers: boolean }
      >
  >
>;

export type ListOptional = Partial<
  Record<
    "onBehalfOfContentOwner" | "onBehalfOfContentOwnerChannel" | "pageToken",
    string
  > & {
    forChannelId: Arrayable<string>;
    maxResults: OneToFiftyInclusive;
    order: "alphabetical" | "relevance" | "unread";
  }
>;

export type ListParameters<P extends Part> = Merge<ListFilter, ListPartials<P>>;

export type ListPartials<P extends Part> = {
  part?: P;
} & ListOptional;

export type Parameters = Filter & ListOptional;

export type Part = Arrayable<keyof Parts>;

export enum PartCost {
  contentDetails = 2,
  id = 0,
  snippet = 2,
  subscriberSnippet = 2,
}

type Parts = {
  id: string;
  contentDetails: ContentDetails;
  snippet: Snippet;
  subscriberSnippet: SubscriberSnippet;
};

type PartUnion<T> = T extends Array<keyof Parts> ? UnionizeTuple<T> : T;

export type ResourceId = Record<"channelId" | "kind", string>;

export type Snippet = Record<
  "channelId" | "description" | "publishedAt" | "title",
  string
> & {
  resourceId: ResourceId;
  thumbnails: Thumbnails;
};

type SubscriberSnippet = Record<
  "channelId" | "description" | "title",
  string
> & {
  thumbnails: Thumbnails;
};

export type Subscription<P extends Part> = MetaData<"youtube#subscription"> &
  Pick<Parts, PartUnion<P>>;

export type SubscriptionListResponse<P extends Part> = PaginatedListResponse<
  "youtube#subscriptionListResponse",
  Subscription<P>
>;
