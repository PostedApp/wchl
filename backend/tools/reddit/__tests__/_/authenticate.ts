import { searchUri } from "../../src/_helpers";
import { authenticate, envParse } from "../../src/_helpers/node";
import dotenv from "dotenv";
import {
  getAuthorizeUrl,
  grantAccessToken,
  prepareAccessToken,
} from "../../src";

process.env.ENV_REDDIT
  ? Object.assign(process.env, dotenv.parse(process.env.ENV_REDDIT))
  : dotenv.config();

const redirect_uri = "http://localhost:3000";

export default () =>
  authenticate({
    envError: () => {
      const missing = ["CLIENT_ID", "USER_AGENT"].filter(
        (k) => !process.env[k]
      );
      if (missing.length) return "Missing: " + missing.join(", ");
    },
    getAuthUrl: () =>
      getAuthorizeUrl({
        client_id: process.env.CLIENT_ID!,
        duration: "permanent",
        redirect_uri,
        response_type: "code",
        scope: [
          "account",
          "history",
          "identity",
          "mysubreddits",
          "read",
          "save",
          "vote",
        ],
      }),
    grant: (url) =>
      grantAccessToken({
        client_id: process.env.CLIENT_ID!,
        code: searchUri(url!, "code").code!,
        grant_type: "authorization_code",
        redirect_uri,
      }).then((auth) => {
        auth.token.userAgent = process.env.USER_AGENT;
        return auth;
      }),
    retrieve: () => prepareAccessToken(envParse("ACCESS_TOKEN")),
  });
