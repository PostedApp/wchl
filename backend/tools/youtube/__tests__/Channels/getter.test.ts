import { iterate } from "../../src/_helpers";
import { Channels } from "../../src";
import { Authentication, defaultPart, isAccessToken } from "../../src/_core";
import { accessToken, apiKey, isMatch, validParts } from "../_";

const kind = "youtube#channelListResponse" as const;
const sample = {
  channelId: ["UC_x5XG1OV2P6uZZ5FSM9Ttw", "UCMDQxm7cUx3yXkfeHa5zJIQ"],
  username: "Google Developers",
};

describe(".List", () => returnsListResponses(accessToken || apiKey));

function returnsListResponses(auth: Authentication) {
  test(`ByChannelId`, async () => {
    const response = await iterate(
      Channels.ListByChannelId(auth, sample.channelId)
    );
    expect(validParts(response, defaultPart)).toBe(true);
    expect(
      isMatch(kind, response, { result: sample.channelId, fieldName: "id" })
    ).toBe(true);
  });

  test(`ByUsername`, async () => {
    const part = "snippet" as const;
    const response = await iterate(
      Channels.ListByUsername(auth, sample.username, { part })
    );
    expect(validParts(response, part)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.username,
        fieldName: "snippet.title",
      })
    ).toBe(true);
  });

  isAccessToken(auth) &&
    test(`MyChannel`, async () => {
      const response = await iterate(Channels.ListMyChannel(auth, true));
      expect(validParts(response, defaultPart)).toBe(true);
    });
}
