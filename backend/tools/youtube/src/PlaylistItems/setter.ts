import { Arrayable, arrayed } from "../_helpers";
import { DeepPartial } from "simplytyped";
import { endpoint } from ".";
import {
  AccessToken,
  defaultPart,
  DeleteResource,
  SetResource,
} from "../_core";
import {
  ContentDetails,
  ListPartials,
  Part,
  PlaylistItem,
  Snippet,
} from "./types";

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
    contentDetails?: Pick<ContentDetails, "endAt" | "note" | "startAt">;
    snippet: Pick<Snippet, "playlistId" | "resourceId"> &
      Partial<Pick<Snippet, "position">>;
  },
  params?: Pick<ListPartials<P>, "onBehalfOfContentOwner" | "part">
) {
  return _set(auth, "POST", resource, params);
}

export async function Update<P extends Part>(
  auth: AccessToken,
  resource: {
    contentDetails?: Pick<ContentDetails, "endAt" | "note" | "startAt">;
    id: string;
    snippet: Pick<Snippet, "playlistId" | "resourceId"> &
      Partial<Pick<Snippet, "position">>;
  },
  params?: Pick<ListPartials<P>, "onBehalfOfContentOwner" | "part">
) {
  return _set(auth, "PUT", resource, params);
}

async function _set<P extends Part>(
  auth: AccessToken,
  method: "POST" | "PUT",
  resource: DeepPartial<PlaylistItem<Part>>,
  params?: ListPartials<P>
): Promise<PlaylistItem<Part>> {
  return SetResource<ListPartials<P>, PlaylistItem<Part>, typeof resource>(
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
