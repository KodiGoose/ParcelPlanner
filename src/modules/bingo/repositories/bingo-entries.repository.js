const BaseRepository = require('#utils/database/base.repository.js');

class BingoEntriesRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.bingo_entries);
		this.models = featureModels;
		this.registry = registry;
	}

	get coreModels() {
		return this.registry.getFeatureModels('core');
	}

	// Returns 1 if a row is deleted, 0 if not.
	// Simulates onDelete: 'RESTRICT'
	async deleteEntry(entryId) {
		const spaceCount = await this.models.bingo_spaces.count({
			where: {
				entry_id: entryId
			}
		});

		if (spaceCount === 0) {
			return await this.destroy({
				where: {
					entry_id: entryId
				}
			});
		}
		else if (spaceCount > 0) {
			throw new Error(`[ERROR] Foreign key constraint, bingo entry ${entryId} still used in ${spaceCount} spaces.`);
		}
	}

	/* TODO
	async deleteGuildEntries(guildId) {
		const spaceCount = await models.bingo_spaces.count({
			where: {
				entry_id: entryId
			}
		});
	}
	*/

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
				model: this.models.bingo_categories,
				through: {
					attributes: []
				}
			}
		});
	}
};

module.exports = BingoEntriesRepository;