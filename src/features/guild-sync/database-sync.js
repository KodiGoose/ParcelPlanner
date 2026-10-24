const ChannelsModel = require('#database/models/discord/channels.js');
const GuildsModel = require('#database/models/discord/guilds.js');
const GuildMembersModel = require('#database/models/discord/guild_members.js');
const MessagesModel = require('#database/models/discord/messages.js');
const UsersModel = require('#database/models/discord/users.js');

module.exports = {
	async removeChannel(channel_id) {
		await ChannelsModel.destroy({
			where: {
				channel_id
			}
		});
	},

	async removeGuild(guild_id) {
		await GuildsModel.destroy({
			where: {
				guild_id
			}
		});
	},

	async removeMessage(message_id) {
		await MessagesModel.destroy({
			where: {
				message_id
			}
		});
	},

	async removeUser(user_id) {
		await UsersModel.destroy({
			where: {
				user_id
			}
		});
	},

	async removeGuildMember(user_id, guild_id) {
		await GuildMembersModel.destroy({
			where: {
				user_id,
				guild_id
			}
		});
	}
};