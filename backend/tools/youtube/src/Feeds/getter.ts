import { Arrayable, arrayed, Cached } from "../_helpers";
import { Feed, Filter, FilterKeys } from "./types";
import { fetchFeed } from "./utils";

export async function* List(
  params: Arrayable<Filter>,
  cached?: Cached
): AsyncIterableIterator<Feed> {
  for (const param of arrayed(params)) yield fetchFeed(param, cached);
}

export const ListByChannelId = compose("channel_id");
export const ListByPlaylistId = compose("playlist_id");
export const ListByUser = compose("user");

function compose<K extends FilterKeys>(key: K) {
  return async function* (ids: Arrayable<string>, cached?: Cached) {
    yield* List(
      arrayed(ids).map((id) => ({ [key]: id } as Filter)),
      cached
    );
  };
}
