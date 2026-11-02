const BaseRepository = require('#utils/database/base.repository.js');

class BingoSpacesRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.bingo_spaces);
		this.models = featureModels;
		this.registry = registry;
	}

	get coreModels() {
		return this.registry.getFeatureModels('core');
	}

	// TODO
};

module.exports = BingoSpacesRepository;