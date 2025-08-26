import { iterate } from "../../src/_helpers";
import { Playlists } from "../../src";
import { Authentication, isAccessToken } from "../../src/_core";
import { accessToken, apiKey, isMatch, validParts } from "../_";

const kind = "youtube#playlistListResponse" as const;
const sample = {
  id: "PLOU2XLYxmsIKPKGv5m_NXz1i3yv50_eq5",
  channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
};

describe(".List", () => returnsListResponses(accessToken || apiKey));

function returnsListResponses(auth: Authentication) {
  test(`ByChannelId`, async () => {
    const part = "snippet" as const;
    const response = await iterate(
      Playlists.ListByChannelId(auth, sample.channelId, { part })
    );
    expect(validParts(response, part)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.channelId,
        fieldName: "snippet.channelId",
      })
    ).toBe(true);
  });

  test(`ByPlaylistId`, async () => {
    const response = await iterate(Playlists.ListByPlaylistId(auth, sample.id));
    expect(validParts(response)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.id,
        fieldName: "id",
      })
    ).toBe(true);
  });

  isAccessToken(auth) &&
    test(`Mine`, async () => {
      const response = await iterate(Playlists.ListMine(auth, true));
      expect(validParts(response)).toBe(true);
    });
}
