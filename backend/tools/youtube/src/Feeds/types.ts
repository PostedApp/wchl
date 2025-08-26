import { UnionToIntersection } from "simplytyped";
import { Thumbnail } from "../_core";

type Author = Record<"name" | "uri", _Text>;

export type ArrayMax15<T extends any> = T[] & {
  0?: T; // https://github.com/Microsoft/TypeScript/issues/15480
  length: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
};

type Entry = Record<
  "id" | "published" | "title" | "updated" | "yt:channelId" | "yt:videoId",
  _Text
> & {
  author: Author;
  link: Link<"alternate">;
  "media:group": Record<"media:description" | "media:title", _Text> & {
    "media:community": {
      "media:starRating": {
        _attributes: Record<"average" | "count" | "max" | "min", number>;
      };
      "media:statistics": {
        _attributes: {
          views: number;
        };
      };
    };
    "media:content": { _attributes: Thumbnail & { type: string } };
    "media:thumbnail": { _attributes: Thumbnail };
  };
};

export type Feed = {
  id: string;
  items: ArrayMax15<FeedItem>;
  kind: "youtube#feed";
  snippet: Record<"channelId" | "channelTitle" | "title", string> & {
    publishedAt?: string;
  };
};

export type FeedItem = {
  id: string;
  kind: "youtube#feedItem";
  snippet: Record<
    "channelId" | "channelTitle" | "description" | "publishedAt" | "title",
    string
  > & {
    thumbnails: {
      high: Thumbnail;
    };
  };
  statistics: Record<"dislikeCount" | "likeCount" | "viewCount", number>;
};

export type Filter =
  | { channel_id: string }
  | { playlist_id: string }
  | { user: string };

export type FilterKeys = keyof UnionToIntersection<Filter>;

export function isFeed(item: any): item is Feed {
  return (
    item?.kind === "youtube#feed" &&
    item.items?.length <= 15 &&
    (item as Feed).items.every?.(
      (feedItem) => feedItem?.kind === "youtube#feedItem"
    )
  );
}

type Link<R extends "alternate" | "self"> = {
  _attributes: {
    href: string;
    rel: R;
  };
};

export type RawFeed<F extends FilterKeys = FilterKeys> = {
  _declaration: {
    _attributes: {
      encoding: "UTF-8";
      version: "1.0";
    };
  };
  feed: Record<"id" | "title" | "yt:channelId", _Text> & {
    _attributes: {
      xmlns: "http://www.w3.org/2005/Atom";
      "xmlns:media": "http://search.yahoo.com/mrss/";
      "xmlns:yt": "http://www.youtube.com/xml/schemas/2015";
    };
    author: Author;
    entry: ArrayMax15<Entry>;
    published?: _Text;
  } & (F extends "playlist_id"
      ? {
          link: Link<"self">;
          "yt:playlistId": _Text;
        }
      : {
          link: [Link<"self">, Link<"alternate">];
        });
};

type _Text = { _text: string };
