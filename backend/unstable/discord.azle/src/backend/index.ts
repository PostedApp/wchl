import express, { Request, Response } from "express";
import "dotenv/config";
import { handleDiscordInteraction, verifyDiscordRequest } from "./discord";

// Add a rawBody property to the Request interface
declare global {
  namespace Express {
    interface Request {
      rawBody: Buffer;
    }
  }
}

const app = express();

app.post(
  "/api/interactions",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
  verifyDiscordRequest(process.env.DISCORD_PUBLIC_KEY!),
  handleDiscordInteraction,
);

app.listen();
