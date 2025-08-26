import { iterate } from "../../src/_helpers";
import { Subscriptions } from "../../src";
import { Authentication, isAccessToken } from "../../src/_core";
import { accessToken, apiKey, isMatch, validParts } from "../_";

const kind = "youtube#subscriptionListResponse" as const;
const sample = {
  channelId: "UCgwHEY9P0wqH5880xEQ1eOA",
};

describe(".List", () => returnsListResponses(accessToken || apiKey));

function returnsListResponses(auth: Authentication) {
  test(`ChannelSubscriptions`, async () => {
    const part = "snippet" as const;
    const response = await iterate(
      Subscriptions.ListChannelSubscriptions(auth, sample.channelId, { part })
    );
    expect(validParts(response, part)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.channelId,
        fieldName: "snippet.channelId",
      })
    ).toBe(true);
  });

  isAccessToken(auth) &&
    test(`CheckForSubscriptions`, async () => {
      const part = "snippet" as const;
      const response = await iterate(
        Subscriptions.ListCheckForSubscriptions(auth, sample.channelId, {
          part,
        })
      );
      expect(validParts(response, part)).toBe(true);
      expect(
        typeof isMatch(kind, response, {
          result: sample.channelId,
          fieldName: "snippet.resourceId.channelId",
        })
      ).toBe("boolean");
    });

  isAccessToken(auth) &&
    test(`MySubscriptions`, async () => {
      const response = await iterate(
        Subscriptions.ListMySubscriptions(auth, true)
      );
      expect(validParts(response)).toBe(true);
    });
}
