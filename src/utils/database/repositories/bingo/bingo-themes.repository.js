const BaseRepository = require('#database/base.repository.js');
const db = require('#database/database.js');

module.exports = new (class extends BaseRepository {
	constructor() {
		super(db.bingo_themes);
	}

	async getGuildThemes(guildId, isCenterFreeFilter) {
		const filteredQuery = {
			where: {
				guild_id: guildId
			}
		};

		if (typeof isCenterFreeFilter === 'boolean') {
			filteredQuery.where.is_center_free = isCenterFreeFilter;
		}

		return await this.findAll(filteredQuery);
	}

	async getCountByGuild(guildId) {
		return await this.count({
			where: {
				guild_id: guildId
			}
		});
	}
})();