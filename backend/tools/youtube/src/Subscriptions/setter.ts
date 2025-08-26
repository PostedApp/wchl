import { Arrayable, arrayed } from "../_helpers";
import { DeepPartial } from "simplytyped";
import { endpoint } from ".";
import {
  AccessToken,
  defaultPart,
  DeleteResource,
  SetResource,
} from "../_core";
import { ListPartials, Part, Snippet, Subscription } from "./types";

export async function Delete(auth: AccessToken, ids: Arrayable<string>) {
  arrayed(ids).forEach((id) =>
    DeleteResource({
      endpoint,
      params: { ...auth, id },
    })
  );
}

export async function Insert<P extends Part>(
  auth: AccessToken,
  resource: {
    snippet: Pick<Snippet, "title">;
  },
  params?: Pick<ListPartials<P>, "part">
) {
  return _set(auth, "POST", resource, params);
}

async function _set<P extends Part>(
  auth: AccessToken,
  method: "POST" | "PUT",
  resource: DeepPartial<Subscription<Part>>,
  params?: ListPartials<P>
): Promise<Subscription<Part>> {
  return SetResource<ListPartials<P>, Subscription<Part>, typeof resource>(
    {
      endpoint,
      params: {
        ...auth,
        ...params,
        part: (params && params.part) || (defaultPart as P),
      },
    },
    method,
    resource
  );
}
