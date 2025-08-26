import { iterate } from "../../../src/_helpers";
import { isListingResponse } from "../../../src/_core";
import { List, Response } from "../../../src/Submissions/user";
import { accessToken } from "../../_";

const username = "theMultiWeb";

describe(".List", () => returnsListResponses());

function returnsListResponses() {
  test.each(["comments"] as const)("where: %p", (where) =>
    Test((res) => isListingResponse(res, "t1"), where)
  );

  test.each([
    "downvoted",
    /*'hidden',*/
    "submitted",
    "upvoted",
  ] as const)("where: %p", (where) =>
    Test((res) => isListingResponse(res, "t3"), where)
  );

  test.each(["", "gilded", "overview" /*'saved'*/] as const)(
    "where: %p",
    (where) => Test((res) => isListingResponse(res, ["t1", "t3"]), where)
  );
}

async function Test<K extends keyof Response>(
  fn: (arg: Response[K]) => boolean,
  where: K
) {
  const response = await iterate(List({ ...accessToken, username, where }));
  expect(response.every((item) => fn(item))).toBe(true);
}
