import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "kick",
    description: "Kicks a user from the server.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to kick.",
        required: true,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for kicking the user.",
        required: false,
      },
    ],
  },
  {
    name: "ban",
    description: "Bans a user from the server.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to ban.",
        required: true,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for banning the user.",
        required: false,
      },
      {
        name: "delete_message_days",
        type: 4, // INTEGER
        description: "The number of days of messages to delete.",
        required: false,
      },
    ],
  },
  {
    name: "timeout",
    description: "Times out a user for a specified duration.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to time out.",
        required: true,
      },
      {
        name: "duration",
        type: 3, // STRING
        description: "The duration of the timeout (e.g., 1h, 1d, 1w).",
        required: true,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for the timeout.",
        required: false,
      },
    ],
  },
  {
    name: "warn",
    description: "Issues a warning to a user.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to warn.",
        required: true,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for the warning.",
        required: true,
      },
    ],
  },
  {
    name: "unban",
    description: "Unbans a user from the server.",
    options: [
      {
        name: "user_id",
        type: 3, // STRING
        description: "The ID of the user to unban.",
        required: true,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for unbanning the user.",
        required: false,
      },
    ],
  },
  {
    name: "mute",
    description: "Mutes a user.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to mute.",
        required: true,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for muting the user.",
        required: false,
      },
    ],
  },
  {
    name: "unmute",
    description: "Unmutes a user.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to unmute.",
        required: true,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for unmuting the user.",
        required: false,
      },
    ],
  },
  {
    name: "prune",
    description: "Deletes a specified number of messages.",
    options: [
      {
        name: "count",
        type: 4, // INTEGER
        description: "The number of messages to delete.",
        required: true,
      },
    ],
  },
  {
    name: "slowmode",
    description: "Sets the slowmode for a channel.",
    options: [
      {
        name: "duration",
        type: 3, // STRING
        description: "The duration of the slowmode (e.g., 1h, 1d, 1w).",
        required: true,
      },
    ],
  },
  {
    name: "user-info",
    description: "Displays information about a user.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to get info about.",
        required: true,
      },
    ],
  },
  {
    name: "softban",
    description: "Kicks a user and deletes their messages.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to softban.",
        required: true,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for softbanning the user.",
        required: false,
      },
      {
        name: "delete_message_days",
        type: 4, // INTEGER
        description: "The number of days of messages to delete.",
        required: false,
      },
    ],
  },
  {
    name: "lock",
    description: "Locks a channel.",
    options: [
      {
        name: "channel",
        type: 7, // CHANNEL
        description: "The channel to lock (defaults to current).",
        required: false,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for locking the channel.",
        required: false,
      },
    ],
  },
  {
    name: "unlock",
    description: "Unlocks a channel.",
    options: [
      {
        name: "channel",
        type: 7, // CHANNEL
        description: "The channel to unlock (defaults to current).",
        required: false,
      },
      {
        name: "reason",
        type: 3, // STRING
        description: "The reason for unlocking the channel.",
        required: false,
      },
    ],
  },
  {
    name: "announce",
    description: "Sends an announcement to a channel.",
    options: [
      {
        name: "channel",
        type: 7, // CHANNEL
        description: "The channel to send the announcement to.",
        required: true,
      },
      {
        name: "message",
        type: 3, // STRING
        description: "The announcement message.",
        required: true,
      },
    ],
  },
  {
    name: "poll",
    description: "Creates a poll in a channel.",
    options: [
      {
        name: "question",
        type: 3, // STRING
        description: "The poll question.",
        required: true,
      },
      {
        name: "options",
        type: 3, // STRING
        description: "Comma-separated options for the poll.",
        required: true,
      },
    ],
  },
  {
    name: "add-role",
    description: "Adds a role to a user.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to add the role to.",
        required: true,
      },
      {
        name: "role",
        type: 8, // ROLE
        description: "The role to add.",
        required: true,
      },
    ],
  },
  {
    name: "remove-role",
    description: "Removes a role from a user.",
    options: [
      {
        name: "user",
        type: 6, // USER
        description: "The user to remove the role from.",
        required: true,
      },
      {
        name: "role",
        type: 8, // ROLE
        description: "The role to remove.",
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

export async function registerCommands() {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID!,
        process.env.DISCORD_GUILD_ID!,
      ),
      { body: commands },
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
