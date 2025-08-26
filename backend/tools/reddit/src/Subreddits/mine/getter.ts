import {
  GetListingResource,
  ListingResponse,
  Subreddit,
  WithAuth,
} from "../../_core";
import { Params, Routes } from "./types";

const defaultWhere = "";

export async function* List<K extends Routes = typeof defaultWhere>({
  where = defaultWhere,
  ...params
}: WithAuth<Params> & {
  where?: K | typeof defaultWhere;
}): AsyncIterableIterator<ListingResponse<Subreddit>> {
  yield* GetListingResource<ListingResponse<Subreddit>, typeof params>({
    endpoint: `/subreddits/mine/${where}`,
    params,
  });
}
