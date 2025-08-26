import { iterate } from "../../../src/_helpers";
import { isListingResponse } from "../../../src/_core";
import { List, Routes } from "../../../src/Subreddits/mine";
import { accessToken } from "../../_";

const suffix = ["", "contributor", "moderator", "subscriber"] as const;

describe(".List", () => returnsListResponses());

function returnsListResponses() {
  test.each(suffix)(`where: %p`, Test);
  test.skip(`where: streams`, async () => Test("streams"));
}

async function Test(where: Routes) {
  const response = await iterate(List({ ...accessToken, where }));
  expect(response.every((listing) => isListingResponse(listing, "t5"))).toBe(
    true
  );
}
