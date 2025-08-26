import { endpoint } from ".";
import { Authentication, defaultPart, GetPaginatedResource } from "../_core";
import {
  CommentThreadListResponse,
  Filter,
  ListParameters,
  ListPartials,
  Part,
} from "./types";

function compose<
  A extends Authentication,
  K extends keyof Filter = keyof Filter
>(key: K) {
  return async function* <P extends Part = typeof defaultPart>(
    auth: A,
    filter: Filter[K],
    params?: ListPartials<P>
  ) {
    yield* List({
      ...auth,
      ...params,
      [key]: filter,
    } as unknown as ListParameters<P>);
  };
}

export async function* List<P extends Part = typeof defaultPart>({
  part = defaultPart as P,
  ...rest
}: ListParameters<P>): AsyncIterableIterator<CommentThreadListResponse<P>> {
  yield* GetPaginatedResource<CommentThreadListResponse<P>, ListParameters<P>>({
    endpoint,
    params: { ...rest, part },
  });
}

export const ListByChannelId = compose("channelId");
export const ListById = compose("id");
export const ListByVideoId = compose("videoId");
export const ListRelatedToChannelId = compose("allThreadsRelatedToChannelId");
