import { endpoint } from ".";
import { Authentication, defaultPart, GetPaginatedResource } from "../_core";
import {
  Filter,
  ListParameters,
  ListPartials,
  Part,
  VideoCategoryListResponse,
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
}: ListParameters<P>): AsyncIterableIterator<VideoCategoryListResponse<P>> {
  yield* GetPaginatedResource<VideoCategoryListResponse<P>, ListParameters<P>>({
    endpoint,
    params: { ...rest, part },
  });
}

export const ListById = compose("id");
export const ListByRegionCode = compose("regionCode");
