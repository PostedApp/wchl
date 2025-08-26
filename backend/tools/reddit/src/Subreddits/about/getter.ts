import { GetListingResource, popSlash, WithAuth } from "../../_core";
import { Params } from "../_";
import { Response, Routes } from "./types";

const defaultWhere = "";

export async function* List<K extends Routes = typeof defaultWhere>({
  subreddit,
  where = defaultWhere,
  ...params
}: WithAuth<Params> & {
  subreddit: string;
  where?: K | typeof defaultWhere;
}): AsyncIterableIterator<Response[K]> {
  yield* GetListingResource<Response[K], typeof params>({
    endpoint: `/r/${popSlash(subreddit)}/about/${where}`,
    params,
  });
}
