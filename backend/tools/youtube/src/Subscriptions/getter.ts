import { endpoint } from ".";
import {
  AccessToken,
  Authentication,
  defaultPart,
  GetPaginatedResource,
} from "../_core";
import {
  ListParameters,
  ListPartials,
  Parameters,
  Part,
  SubscriptionListResponse,
} from "./types";

function compose<A extends Authentication, K extends keyof Parameters>(
  key: K,
  presets?: Parameters
) {
  return async function* <P extends Part = typeof defaultPart>(
    auth: A,
    filter: Parameters[K],
    params?: ListPartials<P>
  ) {
    yield* List({
      ...auth,
      ...params,
      ...presets,
      [key]: filter,
    } as unknown as ListParameters<P>);
  };
}

export async function* List<P extends Part = typeof defaultPart>({
  part = defaultPart as P,
  ...rest
}: ListParameters<P>): AsyncIterableIterator<SubscriptionListResponse<P>> {
  yield* GetPaginatedResource<SubscriptionListResponse<P>, ListParameters<P>>({
    endpoint,
    params: { ...rest, part },
  });
}

export const ListChannelSubscriptions = compose("channelId");
export const ListCheckForSubscriptions = compose<AccessToken, "forChannelId">(
  "forChannelId",
  { mine: true }
);
export const ListMySubscriptions = compose<AccessToken, "mine">("mine");
