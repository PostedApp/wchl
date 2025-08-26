import { Arrayable } from "../_helpers";
import { endpoint } from ".";
import {
  AccessToken,
  Authentication,
  defaultPart,
  GetPaginatedResource,
  GetResource,
} from "../_core";
import {
  Filter,
  GetRatingParameters,
  ListParameters,
  ListPartials,
  Part,
  VideoGetRatingResponse,
  VideoListResponse,
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

export async function GetRating(
  auth: Authentication,
  id: Arrayable<string>
): Promise<VideoGetRatingResponse> {
  return GetResource<VideoGetRatingResponse, GetRatingParameters>({
    endpoint: `${endpoint}/getRating`,
    params: { ...auth, id },
  });
}

export async function* List<P extends Part = typeof defaultPart>({
  part = defaultPart as P,
  ...rest
}: ListParameters<P>): AsyncIterableIterator<VideoListResponse<P>> {
  yield* GetPaginatedResource<VideoListResponse<P>, ListParameters<P>>({
    endpoint,
    params: { ...rest, part },
  });
}

export const ListById = compose("id");
export const ListMyRatedVideos = compose<AccessToken, "myRating">("myRating");
export const ListPopularVideos = compose("chart");
