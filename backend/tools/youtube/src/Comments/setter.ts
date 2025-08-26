import { Arrayable, arrayed } from "../_helpers";
import { DeepPartial } from "simplytyped";
import { endpoint } from ".";
import {
  AccessToken,
  defaultPart,
  DeleteResource,
  SetResource,
} from "../_core";
import { Comment, ListPartials, Part, Snippet } from "./types";

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
    snippet: Pick<Snippet, "parentId" | "textOriginal">;
  },
  params?: Pick<ListPartials<P>, "part">
) {
  return _set(auth, "POST", resource, params);
}

export async function Update<P extends Part>(
  auth: AccessToken,
  resource: {
    id: string;
    snippet: Pick<Snippet, "textOriginal">;
  },
  params?: Pick<ListPartials<P>, "part">
) {
  return _set(auth, "PUT", resource, params);
}

async function _set<P extends Part>(
  auth: AccessToken,
  method: "POST" | "PUT",
  resource: DeepPartial<Comment<Part>>,
  params?: ListPartials<P>
): Promise<Comment<Part>> {
  return SetResource<ListPartials<P>, Comment<Part>, typeof resource>(
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
