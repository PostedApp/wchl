import { envParse } from "../../src/_helpers/node";
import { AccessToken } from "../../src";

export const accessToken = envParse<AccessToken>("ACCESS_TOKEN")!;
