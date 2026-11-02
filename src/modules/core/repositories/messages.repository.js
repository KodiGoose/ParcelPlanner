const BaseRepository = require('#utils/database/base.repository.js');

class MessagesRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.messages);
		this.coreModels = featureModels;
		this.registry = registry;
	}

	// TODO
};

module.exports = MessagesRepository;
