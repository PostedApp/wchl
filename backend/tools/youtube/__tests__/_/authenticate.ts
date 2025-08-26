import { searchUri } from "../../src/_helpers";
import { authenticate, envParse } from "../../src/_helpers/node";
import dotenv from "dotenv";
import {
  getAuthorizeUrl,
  grantAccessToken,
  prepareAccessToken,
} from "../../src";

process.env.ENV_YOUTUBE
  ? Object.assign(process.env, dotenv.parse(process.env.ENV_YOUTUBE))
  : dotenv.config();

const redirect_uri = "http://localhost:3000";

export default () =>
  authenticate({
    envError: () => {
      const missing = ["CLIENT_ID", "CLIENT_SECRET"].filter(
        (k) => !process.env[k]
      );
      if (missing.length) return "Missing: " + missing.join(", ");
    },
    getAuthUrl: () =>
      getAuthorizeUrl({
        access_type: "offline",
        client_id: process.env.CLIENT_ID!,
        redirect_uri,
        response_type: "code",
        scope: "https://www.googleapis.com/auth/youtube.readonly",
      }),
    grant: (url) =>
      grantAccessToken({
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        code: searchUri(url!, "code").code!,
        grant_type: "authorization_code",
        redirect_uri,
      }),
    retrieve: () => prepareAccessToken(envParse("ACCESS_TOKEN")),
  });
