import { iterate } from "../../src/_helpers";
import { CommentThreads } from "../../src";
import { Authentication, isAccessToken } from "../../src/_core";
import { accessToken, apiKey, isMatch, validParts } from "../_";

const kind = "youtube#commentThreadListResponse" as const;
const sample = {
  allThreadsRelatedToChannelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
  channelId: "UCAuUUnT6oDeKwE6v1NGQxug",
  id: "UgwKuh_FrNg3xKQTHVV4AaABAg",
  videoId: "_VB39Jo8mAQ",
};

describe(".List", () =>
  returnsListResponses(
    isAccessToken(
      accessToken, // errors with `Forbidden` if called with any other scopes. Regular apiKey works though, Readonly Oauth doesn't...
      "https://www.googleapis.com/auth/youtube.force-ssl"
    )
      ? accessToken
      : apiKey
  ));

function returnsListResponses(auth: Authentication) {
  test(`RelatedToChannelId`, async () => {
    const part = "snippet" as const;
    const response = await iterate(
      CommentThreads.ListRelatedToChannelId(
        auth,
        sample.allThreadsRelatedToChannelId,
        { part }
      )
    );
    expect(validParts(response, part)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.allThreadsRelatedToChannelId,
        fieldName: "snippet.channelId",
      })
    ).toBe(true);
  });

  test.skip(`ByChannelId`, async () => {
    const part = "snippet" as const;
    const response = await iterate(
      CommentThreads.ListByChannelId(auth, sample.channelId, { part })
    );
    expect(validParts(response, part)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.channelId,
        fieldName: "snippet.channelId",
      })
    ).toBe(true);
  });

  test(`ById`, async () => {
    const response = await iterate(CommentThreads.ListById(auth, sample.id));
    expect(validParts(response)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.id,
        fieldName: "id",
      })
    ).toBe(true);
  });

  test(`ByVideoId`, async () => {
    const part = "snippet" as const;
    const response = await iterate(
      CommentThreads.ListByVideoId(auth, sample.videoId, { part })
    );
    expect(validParts(response, part)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.videoId,
        fieldName: "snippet.videoId",
      })
    ).toBe(true);
  });
}
