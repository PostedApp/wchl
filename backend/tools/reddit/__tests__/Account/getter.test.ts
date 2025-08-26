import { iterate } from "../../src/_helpers";
import { Get, List, Prefs } from "../../src/Account";
import { isKindResponse } from "../../src/_core";
import { accessToken } from "../_";

describe(".List", () => returnsListResponses());

function returnsListResponses() {
  test.each(["prefs/friends", "prefs/messaging"] as const)(
    `%p`,
    async (route) => {
      const response = await iterate(List({ ...accessToken, route }));
      expect(
        response.every(
          (list) =>
            list.length === 2 &&
            list.every((item) => isKindResponse(item, "UserList"))
        )
      ).toBe(true);
    }
  );

  test.todo("blocked");
  test.each(["friends", "prefs/blocked", "prefs/trusted"] as const)(
    `%p`,
    async (route) => {
      const response = await iterate(List({ ...accessToken, route }));
      expect(response.every((item) => isKindResponse(item, "UserList"))).toBe(
        true
      );
    }
  );

  test.each(["karma", "prefs", "trophies"] as const)(`%p`, async (route) => {
    const response = await Get({ ...accessToken, route });
    let valid: boolean;
    switch (route) {
      case "karma":
        valid = isKindResponse(response, "KarmaList");
        break;
      case "prefs":
        valid = typeof (response as Prefs).accept_pms === "string";
        break;
      case "trophies":
        valid = isKindResponse(response, "TrophyList");
        break;
      default:
        valid = false;
    }
    expect(valid).toBe(true);
  });
}
