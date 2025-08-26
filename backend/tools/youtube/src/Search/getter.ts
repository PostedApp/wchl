import { endpoint } from ".";
import {
  AccessToken,
  Authentication,
  defaultPart,
  GetPaginatedResource,
} from "../_core";
import {
  defaultType,
  ForContentOwner,
  ForDeveloper,
  ForMine,
  ListParameters,
  ListPartials,
  Part,
  RelatedToVideoId,
  SearchListResponse,
  Type,
} from "./types";

export async function* List<
  P extends Part = typeof defaultPart,
  T extends Type = typeof defaultType
>({
  part = defaultPart as P,
  type = defaultType as T,
  ...rest
}: ListParameters<P, T>): AsyncIterableIterator<SearchListResponse<P, T>> {
  yield* GetPaginatedResource<SearchListResponse<P, T>, ListParameters<P, T>>({
    endpoint,
    params: {
      ...rest,
      part,
      type,
    } as ListParameters<P, T>,
  });
}

export async function* ListByKeyword<
  P extends Part = typeof defaultPart,
  T extends Type = typeof defaultType
>(auth: Authentication, q: string, params?: ListPartials<P, T>) {
  yield* List({
    ...auth,
    type: defaultType,
    ...params,
    q,
  });
}

export async function* ListByLocation<P extends Part = typeof defaultPart>(
  auth: Authentication,
  location: string,
  locationRadius: string,
  params?: ListPartials<P, "video">
) {
  yield* List({
    ...auth,
    ...params,
    location,
    locationRadius,
    type: "video",
  });
}

export async function* ListContentOwnerVideos<
  P extends Part = typeof defaultPart
>(auth: AccessToken, params?: ForContentOwner & { part?: P }) {
  yield* List({ ...auth, ...params, forContentOwner: true, type: "video" });
}

export async function* ListDeveloperVideos<P extends Part = typeof defaultPart>(
  auth: AccessToken,
  params?: ForDeveloper & { part?: P }
) {
  yield* List({ ...auth, ...params, forDeveloper: true, type: "video" });
}

export async function* ListLiveEvents<P extends Part = typeof defaultPart>(
  auth: Authentication,
  params?: ListPartials<P, "video">
) {
  yield* List({ ...auth, ...params, eventType: "live", type: "video" });
}

export async function* ListMyVideos<P extends Part = typeof defaultPart>(
  auth: AccessToken,
  params?: ForMine & { part?: P }
) {
  yield* List({ ...auth, ...params, forMine: true, type: "video" });
}

export async function* ListRelatedVideos<P extends Part = typeof defaultPart>(
  auth: Authentication,
  relatedToVideoId: string,
  params?: RelatedToVideoId & { part?: P }
) {
  yield* List({ ...auth, ...params, relatedToVideoId, type: "video" });
}
