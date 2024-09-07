//^ Main entry point for the bot
const { SapphireClient } = require("@sapphire/framework");
const { GatewayIntentBits, EmbedBuilder } = require("discord.js");

require("dotenv").config();

//: Create a new client
const client = new SapphireClient({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
  loadMessageCommandListeners: false,
});

//: Login to discord
client.login(process.env.DISCORD_TOKEN);
