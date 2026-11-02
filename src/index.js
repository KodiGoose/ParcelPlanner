const { Client, Collection, GatewayIntentBits } = require('discord.js');

const config = {
	DISCORD_TOKEN: process.env.DISCORD_TOKEN,
	CLIENT_ID: process.env.CLIENT_ID,
	GUILD_ID: process.env.GUILD_ID
};

const { initializeBot } = require('#utils/startup.js');

// Client setup.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

/*
	First we load the database, features, registry, events, and commands.
	Then login and connect to discord.
*/
initializeBot(client).then(() => {
	client.login(config.DISCORD_TOKEN);
});