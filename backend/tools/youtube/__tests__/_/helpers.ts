import { Arrayable, arrayed } from "../../src/_helpers";
import { envParse } from "../../src/_helpers/node";
import { AccessToken, ApiKey, ListResponse } from "../../src";

export const accessToken = envParse<AccessToken>("ACCESS_TOKEN")!;
export const apiKey = envParse<ApiKey>("API_KEY")!;

export function checkMatch<T extends ListResponse<any, any>>(
  { pages, kind }: { pages: Array<T>; kind: string },
  { result, fieldName }: { result: Arrayable<string>; fieldName: string }
): boolean {
  const received = new Set<string>();
  const isValid = pages.every(
    (page) =>
      page.kind === kind &&
      page.items.every((item) => received.add(valued(item, fieldName)).size > 0)
  );

  return isValid && arrayed(result).every((item) => received.has(item));
}

function valued<T = any>(object: any, keys: string): T {
  let current: any = object;
  keys.split(".").forEach((key) => {
    current = current[key];
  });
  return current as T;
}

export function isMatch<K extends string, L extends ListResponse>(
  kind: K,
  pages: Arrayable<L>,
  valid: { result: Arrayable<string>; fieldName: string }
) {
  return checkMatch<L>({ pages: arrayed(pages), kind }, valid);
}

export function validParts(
  {
    0: {
      items: { 0: item = {} },
    },
  }: ListResponse[],
  part: Arrayable<string> = "id"
) {
  const expected = new Set(["etag", "kind", part && "id", ...arrayed(part)]);
  return Object.keys(item).every((key) => expected.has(key));
}
