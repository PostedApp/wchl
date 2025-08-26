import { GetResource, WithAuth } from "../_core";
import { LabeledMulti, Params } from "./types";

export async function Get({
  username,
  ...params
}: WithAuth<Params>): Promise<LabeledMulti[]> {
  return GetResource<LabeledMulti[], typeof params>({
    endpoint: `/api/multi/${username ? `user/${username}` : "mine"}`,
    params,
  });
}
