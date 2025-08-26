import fse from "fs-extra";
import http from "http";
import open from "open";
import destroyer from "server-destroy";

type AccessToken = {
  token: object;
};

export const authenticate = <A extends AccessToken>({
  retrieve,
  envError,
  grant,
  getAuthUrl,
}: {
  retrieve: () => Promise<A | void>;
  envError: (env: typeof process.env) => string | void;
  grant: (url?: string) => Promise<A>;
  getAuthUrl: () => string;
}) =>
  new Promise<AccessToken>(async (resolve, reject) => {
    const accessToken = await retrieve();
    if (accessToken) return resolve(accessToken);
    const error = envError(process.env);
    if (error) return reject(error);
    const server = http
      .createServer(async (req, res) => {
        res.end("Successful authentication! Please return to the console.");
        server.destroy();
        resolve(await grant(req.url));
      })
      .listen(3000, () => open(getAuthUrl()).then((cp) => cp.unref()));
    destroyer(server);
  })
    .then((accessToken) =>
      fse.outputJsonSync(`${process.cwd()}/.env.ACCESS_TOKEN.json`, accessToken)
    )
    .catch((error) =>
      fse.appendFileSync(
        `${process.cwd()}/ERROR.LOG`,
        [new Date().toISOString(), error].join("|")
      )
    );

export function envParse<Parsed extends object>(key: string, throws = false) {
  try {
    const parsed: Parsed = process.env[key]
      ? JSON.parse(process.env[key]!)
      : fse.readJsonSync(`${process.cwd()}/.env.${key}.json`, { throws });
    return parsed;
  } catch (error) {
    if (throws) throw error;
  }
}
