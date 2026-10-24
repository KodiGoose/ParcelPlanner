const { Events } = require('discord.js');

module.exports = {
	name: Events.Warn,
	once: false,
	execute(warning) {
		console.log(`[WARNING] ${warning}`);
	}
};