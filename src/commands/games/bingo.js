const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('bingo').setDescription('Generates a bingo card for the user.'),
	async execute(interaction) {
		return await interaction.reply({
			content: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`,
			withResponse: true
		});
	}
};