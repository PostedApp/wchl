import { Get } from "../../src/Multis";
import { isKindResponse } from "../../src/_core";
import { accessToken } from "../_";

describe(".Get", () => returnsListResponses());

const sample = { username: "theMultiWeb" };

function returnsListResponses() {
  test(`Mine`, async () => Test());
  test(`User`, async () => Test(sample.username));
}

async function Test(username?: string) {
  const response = await Get({ ...accessToken, username });
  expect(response.every((multi) => isKindResponse(multi, "LabeledMulti"))).toBe(
    true
  );
}
