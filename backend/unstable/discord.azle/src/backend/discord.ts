import { verifyKey } from "discord-interactions";
import { Request, Response } from "express";
import { Client, GatewayIntentBits } from "discord.js";

export function verifyDiscordRequest(publicKey: string) {
  return function (req: Request, res: Response, next: any) {
    const signature = req.get("X-Signature-Ed25519");
    const timestamp = req.get("X-Signature-Timestamp");

    if (!signature || !timestamp) {
      return res.status(401).send("Missing required headers");
    }

    const isValid = verifyKey(req.rawBody, signature, timestamp, publicKey);

    if (!isValid) {
      return res.status(401).send("Invalid request signature");
    }

    next();
  };
}

function parseDuration(duration: string): number {
  const value = parseInt(duration.slice(0, -1));
  const unit = duration.slice(-1);

  switch (unit) {
    case "s":
      return value * 1000; // seconds
    case "m":
      return value * 1000 * 60; // minutes
    case "h":
      return value * 1000 * 60 * 60; // hours
    case "d":
      return value * 1000 * 60 * 60 * 24; // days
    case "w":
      return value * 1000 * 60 * 60 * 24 * 7; // weeks
    default:
      return 0;
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.DISCORD_TOKEN);

const recentMessages = new Map<
  string,
  { content: string; timestamp: number }[]
>();
const SPAM_THRESHOLD = 3; // Number of identical messages within TIME_WINDOW
const TIME_WINDOW = 10000; // 10 seconds
const BLACKLISTED_WORDS = ["spam", "scam", "http", "https"]; // Example blacklisted words

// Clean up old messages every minute
setInterval(() => {
  const now = Date.now();
  for (const [userId, messages] of recentMessages.entries()) {
    const filteredMessages = messages.filter(
      (msg) => now - msg.timestamp < TIME_WINDOW
    );
    if (filteredMessages.length === 0) {
      recentMessages.delete(userId);
    } else {
      recentMessages.set(userId, filteredMessages);
    }
  }
}, 60 * 1000); // Every 1 minute

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const userId = message.author.id;
  const userMessages = recentMessages.get(userId) || [];

  // Add current message
  userMessages.push({ content: message.content, timestamp: Date.now() });

  // Filter out old messages
  const filteredMessages = userMessages.filter(
    (msg) => Date.now() - msg.timestamp < TIME_WINDOW
  );
  recentMessages.set(userId, filteredMessages);

  // Check for repeated messages
  const messageCounts = new Map<string, number>();
  for (const msg of filteredMessages) {
    messageCounts.set(msg.content, (messageCounts.get(msg.content) || 0) + 1);
  }

  for (const count of messageCounts.values()) {
    if (count >= SPAM_THRESHOLD) {
      await message.delete();
      await message.channel.send(`${message.author}, please do not spam!`);
      return;
    }
  }

  // Check for blacklisted words
  const lowerCaseContent = message.content.toLowerCase();
  for (const word of BLACKLISTED_WORDS) {
    if (lowerCaseContent.includes(word)) {
      await message.delete();
      await message.channel.send(
        `${message.author}, your message contained a blacklisted word!`
      );
      return;
    }
  }
});

const commandHandlers: {
  [key: string]: (
    options: any,
    member: any,
    res: Response
  ) => Promise<Response>;
} = {
  ping: async (options, member, res) => {
    return res.json({
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: "Pong!",
      },
    });
  },
  kick: async (options, member, res) => {
    const userId = options[0].value;
    const reason = options[1]?.value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      const memberToKick = await guild.members.fetch(userId);
      await memberToKick.kick(reason);

      return res.json({
        type: 4,
        data: {
          content: `Successfully kicked <@${userId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to kick user.",
        },
      });
    }
  },
  ban: async (options, member, res) => {
    const userId = options[0].value;
    const reason = options[1]?.value;
    const deleteMessageDays = options[2]?.value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      await guild.members.ban(userId, { reason, deleteMessageDays });

      return res.json({
        type: 4,
        data: {
          content: `Successfully banned <@${userId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to ban user.",
        },
      });
    }
  },
  timeout: async (options, member, res) => {
    const userId = options[0].value;
    const duration = options[1].value; // e.g., '1h', '1d', '1w'
    const reason = options[2]?.value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      const memberToTimeout = await guild.members.fetch(userId);

      let communicationDisabledUntil: Date | null = null;
      if (duration) {
        const durationInMs = parseDuration(duration);
        if (durationInMs > 0) {
          communicationDisabledUntil = new Date(Date.now() + durationInMs);
        }
      }

      await memberToTimeout.edit({
        communicationDisabledUntil,
        reason,
      });

      return res.json({
        type: 4,
        data: {
          content: `Successfully timed out <@${userId}> for ${duration}.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to time out user.",
        },
      });
    }
  },
  warn: async (options, member, res) => {
    const userId = options[0].value;
    const reason = options[1].value;

    try {
      const user = await client.users.fetch(userId);
      await user.send(`You have been warned for: ${reason}`);
      console.log(`User ${userId} warned for: ${reason}`);

      return res.json({
        type: 4,
        data: {
          content: `Successfully warned <@${userId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to warn user.",
        },
      });
    }
  },
  unban: async (options, member, res) => {
    const userId = options[0].value;
    const reason = options[1]?.value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      await guild.bans.remove(userId, reason);

      return res.json({
        type: 4,
        data: {
          content: `Successfully unbanned <@${userId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to unban user.",
        },
      });
    }
  },
  mute: async (options, member, res) => {
    const userId = options[0].value;
    const reason = options[1]?.value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      const memberToMute = await guild.members.fetch(userId);

      // Mute for 28 days (maximum timeout duration)
      const communicationDisabledUntil = new Date(
        Date.now() + 28 * 24 * 60 * 60 * 1000
      );

      await memberToMute.edit({
        communicationDisabledUntil,
        reason,
      });

      return res.json({
        type: 4,
        data: {
          content: `Successfully muted <@${userId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to mute user.",
        },
      });
    }
  },
  unmute: async (options, member, res) => {
    const userId = options[0].value;
    const reason = options[1]?.value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      const memberToUnmute = await guild.members.fetch(userId);

      await memberToUnmute.edit({
        communicationDisabledUntil: null,
        reason,
      });

      return res.json({
        type: 4,
        data: {
          content: `Successfully unmuted <@${userId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to unmute user.",
        },
      });
    }
  },
  prune: async (options, member, res) => {
    const count = options[0].value;

    try {
      const channel = await client.channels.fetch(member.channel_id);
      if (channel?.isTextBased()) {
        await channel.bulkDelete(count, true);
      }

      return res.json({
        type: 4,
        data: {
          content: `Successfully pruned ${count} messages.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to prune messages.",
        },
      });
    }
  },
  slowmode: async (options, member, res) => {
    const duration = options[0].value;

    try {
      const channel = await client.channels.fetch(member.channel_id);
      if (channel?.isTextBased()) {
        const durationInSeconds = parseDuration(duration) / 1000; // Convert to seconds
        await channel.setRateLimitPerUser(durationInSeconds);
      }

      return res.json({
        type: 4,
        data: {
          content: `Successfully set slowmode to ${duration}.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to set slowmode.",
        },
      });
    }
  },
  "user-info": async (options, member, res) => {
    const userId = options[0].value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      const memberInfo = await guild.members.fetch(userId);
      const user = await client.users.fetch(userId);

      const userInfo = `
        User: ${user.tag}
        ID: ${user.id}
        Joined Server: ${memberInfo.joinedAt?.toDateString()}
        Roles: ${memberInfo.roles.cache.map((role) => role.name).join(", ")}
        `;

      return res.json({
        type: 4,
        data: {
          content: userInfo,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to get user info.",
        },
      });
    }
  },
  softban: async (options, member, res) => {
    const userId = options[0].value;
    const reason = options[1]?.value;
    const deleteMessageDays = options[2]?.value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      await guild.members.ban(userId, { reason, days: deleteMessageDays });
      await guild.members.unban(userId, "Softban completed"); // Unban immediately after to allow rejoining

      return res.json({
        type: 4,
        data: {
          content: `Successfully softbanned <@${userId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to softban user.",
        },
      });
    }
  },
  lock: async (options, member, res) => {
    const channelId = options[0]?.value || member.channel_id;
    const reason = options[1]?.value;

    try {
      const channel = await client.channels.fetch(channelId);
      if (channel?.isTextBased()) {
        await channel.permissionOverwrites.edit(
          channel.guild.roles.everyone,
          {
            SendMessages: false,
          },
          { reason }
        );
      }

      return res.json({
        type: 4,
        data: {
          content: `Successfully locked <#${channelId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to lock channel.",
        },
      });
    }
  },
  unlock: async (options, member, res) => {
    const channelId = options[0]?.value || member.channel_id;
    const reason = options[1]?.value;

    try {
      const channel = await client.channels.fetch(channelId);
      if (channel?.isTextBased()) {
        await channel.permissionOverwrites.edit(
          channel.guild.roles.everyone,
          {
            SendMessages: null,
          },
          { reason }
        );
      }

      return res.json({
        type: 4,
        data: {
          content: `Successfully unlocked <#${channelId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to unlock channel.",
        },
      });
    }
  },
  announce: async (options, member, res) => {
    const channelId = options[0].value;
    const message = options[1].value;

    try {
      const channel = await client.channels.fetch(channelId);
      if (channel?.isTextBased()) {
        await channel.send(message);
      }

      return res.json({
        type: 4,
        data: {
          content: `Announcement sent to <#${channelId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to send announcement.",
        },
      });
    }
  },
  poll: async (options, member, res) => {
    const question = options[0].value;
    const pollOptions = options[1].value
      .split(",")
      .map((opt: string) => opt.trim());

    try {
      const channel = await client.channels.fetch(member.channel_id);
      if (channel?.isTextBased()) {
        const pollMessage = await channel.send(
          `**${question}**\n${pollOptions.map((opt: string, index: number) => `${String.fromCharCode(0x1f1e6 + index)} ${opt}`).join("\n")}`
        );

        for (let i = 0; i < pollOptions.length; i++) {
          await pollMessage.react(String.fromCharCode(0x1f1e6 + i));
        }
      }

      return res.json({
        type: 4,
        data: {
          content: "Poll created!",
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to create poll.",
        },
      });
    }
  },
  "add-role": async (options, member, res) => {
    const userId = options[0].value;
    const roleId = options[1].value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      const memberToModify = await guild.members.fetch(userId);
      await memberToModify.roles.add(roleId);

      return res.json({
        type: 4,
        data: {
          content: `Successfully added role to <@${userId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to add role.",
        },
      });
    }
  },
  "remove-role": async (options, member, res) => {
    const userId = options[0].value;
    const roleId = options[1].value;

    try {
      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
      const memberToModify = await guild.members.fetch(userId);
      await memberToModify.roles.remove(roleId);

      return res.json({
        type: 4,
        data: {
          content: `Successfully removed role from <@${userId}>.`,
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({
        type: 4,
        data: {
          content: "Failed to remove role.",
        },
      });
    }
  },
};

export async function handleDiscordInteraction(req: Request, res: Response) {
  const { type, data, member } = req.body;

  if (type === 1) {
    // PING
    return res.json({ type: 1 }); // PONG
  }

  if (type === 2) {
    // APPLICATION_COMMAND
    const { name, options } = data;
    const handler = commandHandlers[name];

    if (handler) {
      return await handler(options, member, res);
    } else {
      return res.status(404).send("Unknown command.");
    }
  }

  return res.status(404).send("Unknown interaction type");
}
