import { GetListingResource, GetResource, WithAuth } from "../_core";
import { Params, Response, Routes } from "./types";

const defaultGet = "";

export async function Get<K extends Routes["Get"] = typeof defaultGet>({
  route = defaultGet,
  ...params
}: WithAuth<Params[K]> & {
  route?: K | typeof defaultGet;
}): Promise<Response[K]> {
  return GetResource<Response[K], typeof params>({
    endpoint: `/api/v1/me/${route}`,
    params,
  });
}

export async function* List<K extends Routes["List"]>({
  route,
  ...params
}: WithAuth<Params[Routes["List"]]> & {
  route: K;
}): AsyncIterableIterator<Response[K]> {
  yield* GetListingResource<Response[K], typeof params>({
    endpoint: `/${route.startsWith("prefs/") ? route : `api/v1/me/${route}`}`,
    params,
  });
}
