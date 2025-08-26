import { iterate } from "../../../src/_helpers";
import {
  isKindResponse,
  isListingResponse,
  isSubreddit,
} from "../../../src/_core";
import { List, Routes } from "../../../src/Subreddits/about";
import { accessToken } from "../../_";

const subreddit = "technology";

describe(".List", () => returnsListResponses());

function returnsListResponses() {
  test(`where: ""`, () => Test((res) => isSubreddit(res, subreddit)));

  test.skip.each([
    "banned",
    "contributors",
    "muted",
    "wikibanned",
    "wikicontributors",
  ] as Array<Routes>)("where: %p", (where) => Test(isListingResponse, where));

  test(`where: moderators`, () =>
    Test((res) => isKindResponse(res, "UserList"), "moderators"));

  test(`where: rules`, () => Test((res) => res.rules, "rules"));
}

async function Test(fn: (arg: any) => boolean, where?: Routes) {
  const response = await iterate(List({ ...accessToken, subreddit, where }));
  expect(response.every((item) => fn(item))).toBe(true);
}
