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
  InsertOptional,
  Localizations,
  Part,
  Snippet,
  Status,
  Video,
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
      Partial<
        Pick<Snippet, "categoryId" | "defaultLanguage" | "description" | "tags">
      >;
    status?: Pick<
      Status,
      | "embeddable"
      | "license"
      | "privacyStatus"
      | "publicStatsViewable"
      | "publishAt"
    >;
  },
  params?: InsertOptional & { part: P }
) {
  return _set(auth, "POST", resource, params);
}

export async function Rate(
  auth: AccessToken,
  id: string,
  rating: "dislike" | "like"
) {
  return SetResource(
    {
      endpoint: `${endpoint}/rate`,
      params: {
        ...auth,
        id,
        rating,
      },
    },
    "POST",
    undefined
  );
}

export async function Update<P extends Part>(
  auth: AccessToken,
  resource: {
    id: string;
    localizations?: Localizations;
    snippet: Pick<Snippet, "categoryId" | "title"> &
      Partial<Pick<Snippet, "defaultLanguage" | "description" | "tags">>;
    status?: Pick<Status, "privacyStatus">;
  },
  params?: Pick<InsertOptional, "onBehalfOfContentOwner"> & { part: P }
) {
  return _set(auth, "PUT", resource, params);
}

async function _set<P extends Part>(
  auth: AccessToken,
  method: "POST" | "PUT",
  resource: DeepPartial<Video<Part>>,
  params?: InsertOptional & { part: P }
): Promise<Video<Part>> {
  return SetResource<
    InsertOptional & { part: P },
    Video<Part>,
    typeof resource
  >(
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
