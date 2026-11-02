const BaseRepository = require('#utils/database/base.repository.js');

class BingoCategoriesRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.bingo_categories);
		this.models = featureModels;
		this.registry = registry;
	}

	get coreModels() {
		return this.registry.getFeatureModels('core');
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
				model: this.models.bingo_entries,
				through: {
					attributes: []
				}
			}
		};

		if (typeof isEnabledFilter === 'boolean') {
			filteredQuery.include.where = {
				is_enabled: isEnabledFilter
			};
		}

		return await this.findAll(filteredQuery);
	}
};

module.exports = BingoCategoriesRepository;