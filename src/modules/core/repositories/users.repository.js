const BaseRepository = require('#utils/database/base.repository.js');

class UsersRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.users);
		this.coreModels = featureModels;
		this.registry = registry;
	}

	// TODO
};

module.exports = UsersRepository;