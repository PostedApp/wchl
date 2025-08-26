import { iterate } from "../../src/_helpers";
import { Comments } from "../../src";
import { Authentication, defaultPart, isAccessToken } from "../../src/_core";
import { accessToken, apiKey, isMatch, validParts } from "../_";

const kind = "youtube#commentListResponse" as const;
const sample = {
  commentId: "UgwKuh_FrNg3xKQTHVV4AaABAg",
  parentId: "UgwKuh_FrNg3xKQTHVV4AaABAg",
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
  test(`ByCommentId`, async () => {
    const response = await iterate(
      Comments.ListByCommentId(auth, sample.commentId)
    );
    expect(validParts(response, defaultPart)).toBe(true);
    expect(
      isMatch(kind, response, { result: sample.commentId, fieldName: "id" })
    ).toBe(true);
  });

  test(`ByParentId`, async () => {
    const part = "snippet" as const;
    const response = await iterate(
      Comments.ListByParentId(auth, sample.parentId, { part })
    );
    expect(validParts(response, part)).toBe(true);
    expect(
      isMatch(kind, response, {
        result: sample.parentId,
        fieldName: "snippet.parentId",
      })
    ).toBe(true);
  });
}
