const { Events } = require('discord.js');

const DEBUG_LOGGING = true;

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			let response;

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				response = await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: 'There was an error while executing the command!',
						flags: MessageFlags.Ephemeral
					});
				}
				else {
					await interaction.reply({
						content: 'There was an error while executing this command!',
						flags: MessageFlags.Ephemeral
					});
				}
			}

			if (DEBUG_LOGGING) {
				console.log(interaction);

				if (typeof response !== 'undefined') {
					console.log(response);
				}
			}
			/*
			console.log(`
				user ID: ${interaction.user.id}\n
				${interaction.
			`);
			*/
		}
	}
};