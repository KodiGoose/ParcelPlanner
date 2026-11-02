const BaseRepository = require('#utils/database/base.repository.js');

class GuildsRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.guilds);
		this.coreModels = featureModels;
		this.registry = registry;
	}
}

module.exports = GuildsRepository;