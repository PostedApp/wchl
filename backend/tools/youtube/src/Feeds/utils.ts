import {
  arrayed,
  Cached,
  querify,
  replaceSpaces,
  tryCached,
} from "../_helpers";
import fetch from "cross-fetch";
import { ElementCompact, xml2js } from "xml-js";
import { ArrayMax15, Feed, FeedItem, RawFeed } from "./types";

export async function fetchFeed(param: object, cached: Cached = {}) {
  const key = encodeURI(
    replaceSpaces(`https://www.youtube.com/feeds/videos.xml${querify(param)}`)
  );

  const valued = async () => {
    const res = await fetch(key);
    if (!res.ok) throw Error(`${res.status}:${res.statusText}`);
    return parseFeed(
      xml2js(await res.text(), {
        compact: true,
        nativeType: true,
      })
    );
  };

  return tryCached(cached, {
    key,
    valued,
  }).then(({ value }) => value);
}

export function parseFeed(compactJs: ElementCompact): Feed {
  const { feed } = compactJs as RawFeed;
  const items = ((Array.isArray(feed.entry) && feed.entry) || []).map(
    (entry) => {
      const { average, count, max, min } =
        entry["media:group"]["media:community"]["media:starRating"]._attributes;
      const likeRatio = (average - min) / (max - min);
      return {
        id: entry["yt:videoId"]._text,
        kind: "youtube#feedItem",
        snippet: {
          channelId: entry["yt:channelId"]._text,
          channelTitle: entry.author.name._text,
          description: entry["media:group"]["media:description"]._text,
          publishedAt: entry.published._text,
          thumbnails: {
            high: entry["media:group"]["media:thumbnail"]._attributes,
          },
          title: entry.title._text,
        },
        statistics: {
          dislikeCount: toFixed(count * (1 - likeRatio)),
          likeCount: toFixed(count * likeRatio),
          viewCount: Number(
            entry["media:group"]["media:community"]["media:statistics"]
              ._attributes.views
          ),
        },
      };
    }
  ) as ArrayMax15<FeedItem>;
  return {
    id: arrayed(feed.link)[0]._attributes.href.split("?").pop() as string,
    items,
    kind: "youtube#feed",
    snippet: {
      channelId: feed["yt:channelId"]._text,
      channelTitle: feed.author.name._text,
      publishedAt: feed.published && feed.published._text,
      title: feed.title._text,
    },
  };
}

function toFixed(value: number, fractionDigits?: number) {
  return Number(value.toFixed(fractionDigits));
}
