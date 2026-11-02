const BaseRepository = require('#utils/database/base.repository.js');

class BingoThemesRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.bingo_themes);
		this.models = featureModels;
		this.registry = registry;
	}

	get coreModels() {
		return this.registry.getFeatureModels('core');
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

	// Returns 1 if a row is deleted, 0 if not.
	// Simulates onDelete: 'RESTRICT'
	/*
	async deleteTheme(themeId) {
		const scheduleCount = await models.bingo_spaces.count({
			where: {
				theme_id: themeId
			}
		});

		if (spaceCount === 0) {
			return await this.destroy({
				where: {
					theme_id: themeId
				}
			});
		}
		else if (spaceCount > 0) {
			throw new Error(`[ERROR] Foreign key constraint, bingo entry ${entryId} still used in ${spaceCount} spaces.`);
		}
	}
	*/
};

module.exports = BingoThemesRepository;