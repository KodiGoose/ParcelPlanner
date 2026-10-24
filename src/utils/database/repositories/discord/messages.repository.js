const { BaseRepository } = require('#database/base.repository.js');

module.exports = new (class extends BaseRepository {
	constructor() {
		super(Messages);
	}

})();