import { iterate } from "../../src/_helpers";
import { PlaylistItems } from "../../src";
import { Authentication } from "../../src/_core";
import { accessToken, apiKey, isMatch, validParts } from "../_";

const kind = "youtube#playlistItemListResponse" as const;
const sample = {
  id: "UExCQ0YyREFDNkZGQjU3NERFLkE2OTA3QzIwNEI3RjYxMDE",
  playlistId: "PLBCF2DAC6FFB574DE",
};

describe(".List", () => returnsListResponses(accessToken || apiKey));

function returnsListResponses(auth: Authentication) {
  test(`ByPlaylistId`, async () => {
    const part = "snippet" as const;
    const response = await iterate(
      PlaylistItems.ListByPlaylistId(auth, sample.playlistId, { part })
    );
    expect(validParts(response, part)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.playlistId,
        fieldName: "snippet.playlistId",
      })
    ).toBe(true);
  });

  test(`ByPlaylistItemId`, async () => {
    const response = await iterate(
      PlaylistItems.ListByPlaylistItemId(auth, sample.id)
    );
    expect(validParts(response)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.id,
        fieldName: "id",
      })
    ).toBe(true);
  });
}
