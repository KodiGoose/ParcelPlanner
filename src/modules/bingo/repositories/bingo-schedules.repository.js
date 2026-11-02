const BaseRepository = require('#utils/database/base.repository.js');

class BingoSchedulesRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.bingo_schedules);
		this.models = featureModels;
		this.registry = registry;
	}

	get coreModels() {
		return this.registry.getFeatureModels('core');
	}

	// TODO
};

module.exports = BingoSchedulesRepository;