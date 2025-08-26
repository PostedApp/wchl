import { iterate } from "../../src/_helpers";
import { Search } from "../../src";
import { defaultType } from "../../src/Search/types";
import { Authentication, isAccessToken } from "../../src/_core";
import { accessToken, apiKey, validParts } from "../_";

const sample = {
  location: "21.5922529,-158.1147114",
  locationRadius: "10mi",
  q: "news",
  relatedToVideoId: "Ks-_Mh1QhMc",
};

describe(".List", () => returnsListResponses(accessToken || apiKey));

function returnsListResponses(auth: Authentication) {
  test(`ByKeyword`, async () => {
    const response = await iterate(
      Search.ListByKeyword(auth, sample.q, { type: defaultType })
    );
    expect(validParts(response)).toBe(true);
  });

  test(`ByLocation`, async () => {
    const response = await iterate(
      Search.ListByLocation(auth, sample.location, sample.locationRadius)
    );
    expect(validParts(response)).toBe(true);
  });

  isAccessToken(auth, "https://www.googleapis.com/auth/youtubepartner") &&
    test(`ContentOwnerVideos`, async () => {
      const response = await iterate(Search.ListContentOwnerVideos(auth));
      expect(validParts(response)).toBe(true);
    });

  isAccessToken(auth) &&
    test.skip(`DeveloperVideos`, async () => {
      const response = await iterate(Search.ListDeveloperVideos(auth));
      expect(validParts(response)).toBe(true);
    });

  test(`LiveEvents`, async () => {
    const response = await iterate(Search.ListLiveEvents(auth));
    expect(validParts(response)).toBe(true);
  });

  isAccessToken(auth) &&
    test.skip(`MyVideos`, async () => {
      const response = await iterate(Search.ListMyVideos(auth));
      expect(validParts(response)).toBe(true);
    });

  test(`RelatedVideos`, async () => {
    const response = await iterate(
      Search.ListRelatedVideos(auth, sample.relatedToVideoId)
    );
    expect(validParts(response)).toBe(true);
  });
}
