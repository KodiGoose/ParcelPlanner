const BaseRepository = require('#utils/database/base.repository.js');

class ChannelsRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.channels);
		this.coreModels = featureModels;
		this.registry = registry;
	}

	/*
	async getGuildChannels(guildId, whereFilter = null) {


		if (typeof whereFilter === 'array') {

		}

		return await this.findByPk(guildId, {
			include: [
				{
					model: db.bingo_spaces,
					order: [['position', 'ASC']]
				}
			]
		});
	}
	*/
};

module.exports = ChannelsRepository;