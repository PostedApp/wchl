import { endpoint } from ".";
import {
  AccessToken,
  Authentication,
  defaultPart,
  GetPaginatedResource,
} from "../_core";
import {
  ChannelListResponse,
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
}: ListParameters<P>): AsyncIterableIterator<ChannelListResponse<P>> {
  yield* GetPaginatedResource<ChannelListResponse<P>, ListParameters<P>>({
    endpoint,
    params: { ...rest, part },
  });
}

export const ListByChannelId = compose("id");
export const ListByUsername = compose("forUsername");
export const ListMyChannel = compose<AccessToken, "mine">("mine");
