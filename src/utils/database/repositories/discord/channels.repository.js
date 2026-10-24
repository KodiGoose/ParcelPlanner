const BaseRepository = require('#database/base.repository.js');
const db = require('#database/database.js');

module.exports = new (class extends BaseRepository {
	constructor() {
		super(db.channels);
	}

	// TODO
})();