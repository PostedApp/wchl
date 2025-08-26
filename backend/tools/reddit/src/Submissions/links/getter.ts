import { prepend, replaceAll } from "../../_helpers";
import { GetListingResource, WithAuth } from "../../_core";
import { Params, Response } from "./types";

const defaultRoute = "";

export async function* List<K extends keyof Response = typeof defaultRoute>({
  route = defaultRoute,
  ...rest
}: WithAuth<Params[K]> & {
  route?: K | typeof defaultRoute;
}): AsyncIterableIterator<Response[K]> {
  yield* GetListingResource(extract({ ...rest, route }));
}

function extract({
  route,
  ...rest
}: Partial<WithAuth<Params[keyof Response]>> & {
  route: keyof Params;
}) {
  switch (route) {
    case "by_id": {
      const { names, ...params } = rest as WithAuth<Params[typeof route]>;
      return { endpoint: `/by_id/${prepend(names, "t3_")}`, params };
    }
    case "duplicates": {
      const { article, ...params } = rest as WithAuth<Params[typeof route]>;
      return {
        endpoint: `/duplicates/${prepend(article, "t3_", false)}`,
        params,
      };
    }
    default: {
      const { path = "", ...params } = rest as WithAuth<Params[typeof route]>;
      return {
        endpoint: replaceAll(`/${path}/${route}`, "//", "/"),
        params,
      };
    }
  }
}
