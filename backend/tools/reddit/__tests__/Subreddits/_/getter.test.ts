import { iterate } from "../../../src/_helpers";
import { isListingResponse } from "../../../src/_core";
import { List, Routes } from "../../../src/Subreddits/_";
import { accessToken } from "../../_";

const common = ["", "new", "popular"] as const;
const suffix = {
  subreddits: [...common, "default", "gold"],
  users: common,
} as const;

describe(".ListSubreddits", () => returnsListResponses("subreddits"));
describe(".ListUsers", () => returnsListResponses("users"));

function returnsListResponses<K extends keyof Routes>(route: K) {
  test.each(suffix[route])(`where: %p`, async (where) =>
    Test(route, where as Routes[K])
  );
}

async function Test<K extends keyof Routes>(route: K, where: Routes[K]) {
  const response = await iterate(List({ ...accessToken, route, where }));
  expect(response.every((listing) => isListingResponse(listing, "t5"))).toBe(
    true
  );
}
