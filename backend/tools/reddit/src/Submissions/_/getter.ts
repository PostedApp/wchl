import { GetResource, WithAuth } from "../../_core";
import { Params, Response } from "./types";

const defaultRoute = "info";

export async function Get<K extends keyof Response = typeof defaultRoute>({
  route = defaultRoute,
  ...params
}: WithAuth<Params[K]> & { route?: K | typeof defaultRoute }): Promise<
  Response[K]
> {
  return GetResource<Response[K], typeof params>({
    endpoint: `/api/${route}`,
    params,
  });
}
