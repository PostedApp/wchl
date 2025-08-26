import { DeepPartial } from "simplytyped";
import { endpoint } from ".";
import { AccessToken, defaultPart, SetResource } from "../_core";
import { Channel, ListPartials, Part, UpdateParts } from "./types";

export async function Update<P extends keyof UpdateParts>(
  auth: AccessToken,
  resource: UpdateParts,
  params?: Pick<ListPartials<P>, "onBehalfOfContentOwner" | "part">
) {
  return _set(auth, "PUT", resource, params);
}

async function _set<P extends Part>(
  auth: AccessToken,
  method: "POST" | "PUT",
  resource: DeepPartial<Channel<Part>>,
  params?: ListPartials<P>
): Promise<Channel<Part>> {
  return SetResource<ListPartials<P>, Channel<Part>, typeof resource>(
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
