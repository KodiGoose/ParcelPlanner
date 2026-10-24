const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('hello').setDescription('Self explanatory!'),
	async execute(interaction) {
		return await interaction.reply({
			content: 'Hello world!',
			withResponse: true
		});
	}
};