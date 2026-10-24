const BaseRepository = require('#database/base.repository.js');
const db = require('#database/database.js');

module.exports = new (class extends BaseRepository {
	constructor() {
		super(db.bingo_cards);
	}

	async getCardWithSpaces(cardId) {
		return await this.findByPk(cardId, {
			include: [
				{
					model: db.bingo_spaces,
					order: [['position', 'ASC']]
				}
			]
		});
	}
})();