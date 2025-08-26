import { isComment, isListingResponse } from "../../../src/_core";
import { Get, GetMore } from "../../../src/Submissions/comments";
import { accessToken } from "../../_";

const article = "92dd8";
const subreddit = "pics";

describe(".List", () => returnsListResponses());

function returnsListResponses() {
  test(`comments`, async () => {
    const [link, comment] = await Get({
      ...accessToken,
      article,
      context: 2,
      showedits: true,
      showmore: true,
      sort: "top",
      subreddit,
      threaded: true,
      truncate: 3,
    });

    expect(
      isListingResponse(link, "t3") && isListingResponse(comment, "t1")
    ).toBe(true);
  });

  test(`morecomments`, async () => {
    const {
      json: {
        data: { things },
      },
    } = await GetMore({
      api_type: "json",
      ...accessToken,
      children: [
        "c0b6zuo",
        "c0b70kb",
        "c0b96p2",
        "c0b6zuv",
        "c0b7bpm",
        "c0b6zyu",
        "c0j9iqf",
        "c0b6zx7",
      ],
      limit_children: true,
      link_id: "t3_92dd8",
      sort: "top",
    });

    expect(things.every(isComment)).toBe(true);
  });
}
