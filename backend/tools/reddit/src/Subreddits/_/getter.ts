import {
  GetListingResource,
  ListingResponse,
  Subreddit,
  WithAuth,
} from "../../_core";
import { Params, Routes } from "./types";

const defaultRoute = "subreddits";

export async function* List<K extends keyof Routes = typeof defaultRoute>({
  route = defaultRoute,
  where = "",
  ...params
}: WithAuth<Params> & {
  route?: K | typeof defaultRoute;
  where?: Routes[K] | "";
}): AsyncIterableIterator<ListingResponse<Subreddit>> {
  yield* GetListingResource<ListingResponse<Subreddit>, typeof params>({
    endpoint: `/${route}/${where}`,
    params,
  });
}
