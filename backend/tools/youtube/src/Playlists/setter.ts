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
  ListPartials,
  Localizations,
  Part,
  Playlist,
  Snippet,
  Status,
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
    localizations?: Localizations;
    snippet: Pick<Snippet, "title"> &
      Partial<Pick<Snippet, "defaultLanguage" | "description" | "tags">>;
    status?: Pick<Status, "privacyStatus">;
  },
  params?: Pick<
    ListPartials<P>,
    "onBehalfOfContentOwner" | "onBehalfOfContentOwnerChannel" | "part"
  >
) {
  return _set(auth, "POST", resource, params);
}

export async function Update<P extends Part>(
  auth: AccessToken,
  resource: {
    id: string;
    localizations?: Localizations;
    snippet: Pick<Snippet, "title"> &
      Partial<Pick<Snippet, "defaultLanguage" | "description" | "tags">>;
    status?: Pick<Status, "privacyStatus">;
  },
  params?: Pick<ListPartials<P>, "onBehalfOfContentOwner" | "part">
) {
  return _set(auth, "PUT", resource, params);
}

async function _set<P extends Part>(
  auth: AccessToken,
  method: "POST" | "PUT",
  resource: DeepPartial<Playlist<Part>>,
  params?: ListPartials<P>
): Promise<Playlist<Part>> {
  return SetResource<ListPartials<P>, Playlist<Part>, typeof resource>(
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
