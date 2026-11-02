const BaseRepository = require('#utils/database/base.repository.js');

class BingoChannelsRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.bingo_channels);
		this.registry = registry;
	}

	get coreModels() {
		return this.registry.getFeatureModels('core');
	}

	async getGuildBingoChannels(guildId) {
		return await this.findAll({
			where: {
				guild_id: guildId
			},
			limit: 500,
			include: [{
				model: this.coreModels.channels
			}],
			order: [[this.coreModels.channels, 'position', 'ASC']]
		});
	}

	async setLogChannel(channelId, guildId) {
		return sequelize.transaction(async (t) => {
			const existingLogChannel = await this.findOne({
				where: {
					guild_id: guildId,
					is_log: true
				},
				transaction: t
			});

			if (existingLogChannel) {
				if (existingLogChannel.channel_id === channelId) {
					return [existingLogChannel, false];
				}

				existingLogChannel.is_log = false;

				if (!existingLogChannel.is_play) {
					await existingLogChannel.destroy({
						transaction: t
					});
				}
				else {
					await existingLogChannel.save({
						transaction: t
					});
				}
			}

			return await this.upsert({
				channel_id: channelId,
				guild_id: guildId,
				is_log: true
			},
			{
				transaction: t
			});
		});
	}

	async setPlayChannel(channelId, guildId) {
		return sequelize.transaction(async (t) => {
			return await this.upsert({
				channel_id: channelId,
				guild_id: guildId,
				is_play: true
			},
			{
				transaction: t
			});
		});
	}

	// Returns 1 if a row is removed or changed, 0 if not.
	async removePlayChannel(channelId) {
		if (channelId) {
			const existingLogChannel = await this.findOne({
				where: {
					channel_id: channelId,
					is_log: true
				}
			});

			if (existingLogChannel) {
				existingLogChannel.is_play = false;

				await existingLogChannel.save();

				return 1;
			}
			else {
				return await this.destroy({
					where: {
						channel_id: channelId
					}
				});
			}
		}
		else {
			return 0;
		}
	}

	// Returns number of rows changed, 0 if none.
	async removeGuildPlayChannels(guildId) {
		if (guildId) {
			const existingLogChannel = await this.findOne({
				where: {
					guild_id: guildId,
					is_log: true,
					is_play: true
				}
			});

			let updatedRows = 0;

			if (existingLogChannel) {
				existingLogChannel.is_play = false;

				await existingLogChannel.save();

				updatedRows += 1;
			}

			const deletedRows = await this.destroy({
				where: {
					guild_id: guildId,
					is_play: true,
					is_log: false
				}
			});

			return updatedRows + deletedRows;
		}
		else {
			return 0;
		}
	}

	// Returns number of rows changed, 0 if none.
	async removeGuildLogChannel(guildId) {
		return sequelize.transaction(async (t) => {
			const existingLogChannel = await this.findOne({
				where: {
					guild_id: guildId,
					is_log: true
				},
				transaction: t
			});

			if (existingLogChannel) {
				existingLogChannel.is_log = false;

				if (!existingLogChannel.is_play) {
					return await existingLogChannel.destroy({
						transaction: t
					});
				}
				else {
					return await existingLogChannel.save({
						transaction: t
					});
				}
			}
		});
	}
};

module.exports = BingoChannelsRepository;