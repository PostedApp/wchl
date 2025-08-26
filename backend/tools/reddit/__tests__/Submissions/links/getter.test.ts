import { iterate } from "../../../src/_helpers";
import { isListingResponse } from "../../../src/_core";
import { List, Response } from "../../../src/Submissions/links";
import { accessToken } from "../../_";

const article = "t3_74hn13";
const names = ["92dd8", article];
const path = "/r/askreddit";

describe(".List", () => returnsListResponses());

function returnsListResponses() {
  test.each([
    "",
    "best",
    "by_id",
    "controversial",
    "duplicates",
    "hot",
    "new",
    "rising",
    "top",
  ] as Array<keyof Response>)(`%p`, async (route) => {
    switch (route) {
      case "by_id": {
        const response = await iterate(List({ ...accessToken, names, route }));
        expect(response.every((item) => isListingResponse(item, "t3"))).toBe(
          true
        );
        break;
      }
      case "duplicates": {
        const response = await iterate(
          List({ ...accessToken, article, route })
        );
        expect(
          response.every((items) =>
            items.every((item) => isListingResponse(item, "t3"))
          )
        ).toBe(true);
        break;
      }
      default: {
        const response = await iterate(List({ ...accessToken, path, route }));
        expect(response.every((item) => isListingResponse(item, "t3"))).toBe(
          true
        );
        break;
      }
    }
  });
}
