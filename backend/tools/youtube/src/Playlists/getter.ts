import { endpoint } from ".";
import {
  AccessToken,
  Authentication,
  defaultPart,
  GetPaginatedResource,
} from "../_core";
import {
  Filter,
  ListParameters,
  ListPartials,
  Part,
  PlaylistListResponse,
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
}: ListParameters<P>): AsyncIterableIterator<PlaylistListResponse<P>> {
  yield* GetPaginatedResource<PlaylistListResponse<P>, ListParameters<P>>({
    endpoint,
    params: { ...rest, part },
  });
}

export const ListByChannelId = compose("channelId");
export const ListByPlaylistId = compose("id");
export const ListMine = compose<AccessToken, "mine">("mine");
