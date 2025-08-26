import { iterate } from "../../src/_helpers";
import { Videos } from "../../src";
import { Authentication, defaultPart, isAccessToken } from "../../src/_core";
import { accessToken, apiKey, isMatch, validParts } from "../_";

const kind = "youtube#videoListResponse" as const;
const sample = {
  id: ["Ks-_Mh1QhMc", "c0KYU2j0TM4", "eIho2S0ZahI"],
  myRating: "like" as const,
  chartId: {
    regionCode: "US",
    videoCategoryId: "28",
  },
};

describe(".List", () => returnsListResponses(accessToken || apiKey));

function returnsListResponses(auth: Authentication) {
  test(`ById`, async () => {
    const response = await iterate(Videos.ListById(auth, sample.id));
    expect(validParts(response, defaultPart)).toBe(true);
    expect(
      isMatch(kind, response, { result: sample.id, fieldName: "id" })
    ).toBe(true);
  });

  isAccessToken(auth) &&
    test(`MyRatedVideos`, async () => {
      const response = await iterate(
        Videos.ListMyRatedVideos(auth, sample.myRating)
      );
      expect(validParts(response)).toBe(true);
    });

  test(`PopularVideos`, async () => {
    const response = await iterate(
      Videos.ListPopularVideos(auth, "mostPopular", sample.chartId)
    );
    expect(validParts(response)).toBe(true);
  });

  isAccessToken(auth, [
    "https://www.googleapis.com/auth/youtubepartner",
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl",
  ]) &&
    test(`GetRating`, async () => {
      const response = await Videos.GetRating(auth, sample.id);
      const kind = "youtube#videoGetRatingResponse";
      expect(
        isMatch(kind, response, {
          result: sample.id,
          fieldName: "videoId",
        })
      ).toBe(true);
    });
}
