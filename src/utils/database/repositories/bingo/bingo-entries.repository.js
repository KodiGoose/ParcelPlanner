const BaseRepository = require('#database/base.repository.js');
const db = require('#database/database.js');

module.exports = new (class extends BaseRepository {
	constructor() {
		super(db.bingo_entries);
	}

	async getGuildEntries(guildId) {
		return await this.findAll({
			where: {
				guild_id: guildId
			}
		});
	}

	async getCountByGuild(guildId) {
		return await this.count({
			where: {
				guild_id: guildId
			}
		});
	}

	async getEntryCategories(entryId) {
		return await this.findAll({
			where: {
				entry_id: entryId
			},
			include: {
				model: db.bingo_categories,
				through: {
					attributes: []
				}
			}
		});
	}
})();