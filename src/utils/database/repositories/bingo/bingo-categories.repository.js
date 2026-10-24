const BaseRepository = require('#database/base.repository.js');
const db = require('#database/database.js');

module.exports = new (class extends BaseRepository {
	constructor() {
		super(db.bingo_categories);
	}

	async getGuildCategories(guildId) {
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

	async getCategoryEntries(categoryId, isEnabledFilter = null) {
		const filteredQuery = {
			where: {
				category_id: categoryId
			},
			include: {
				model: db.bingo_entries,
				through: {
					attributes: []
				}
			}
		};

		if (isEnabledFilter) {
			filteredQuery.include.where = {
				is_enabled: isEnabledFilter
			};
		}

		return await this.findAll(filteredQuery);
	}
})();