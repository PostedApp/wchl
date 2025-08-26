import { GetListingResource, popSlash, WithAuth } from "../../_core";
import { Params, Response } from "./types";

const defaultWhere = "";

export async function* List<K extends keyof Response = typeof defaultWhere>({
  username,
  where = defaultWhere,
  ...params
}: WithAuth<Params> & {
  username: string;
  where?: K | typeof defaultWhere;
}): AsyncIterableIterator<Response[K]> {
  yield* GetListingResource<Response[K], typeof params>({
    endpoint: `/user/${popSlash(username)}/${where}`,
    params,
  });
}
