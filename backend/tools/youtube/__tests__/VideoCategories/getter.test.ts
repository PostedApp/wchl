import { iterate } from "../../src/_helpers";
import { VideoCategories } from "../../src";
import { Authentication } from "../../src/_core";
import { accessToken, apiKey, isMatch, validParts } from "../_";

const kind = "youtube#videoCategoryListResponse" as const;
const sample = {
  id: "28",
  regionCode: "US",
};

describe(".List", () => returnsListResponses(accessToken || apiKey));

function returnsListResponses(auth: Authentication) {
  test(`ById`, async () => {
    const response = await iterate(VideoCategories.ListById(auth, sample.id));
    expect(validParts(response, "snippet")).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.id,
        fieldName: "id",
      })
    ).toBe(true);
  });

  test(`ByRegionCode`, async () => {
    const response = await iterate(
      VideoCategories.ListByRegionCode(auth, sample.regionCode)
    );
    expect(validParts(response, "snippet")).toBe(true);
  });
}
