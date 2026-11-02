const BaseRepository = require('#utils/database/base.repository.js');

class BingoCardsRepository extends BaseRepository {
	constructor(featureModels, registry) {
		super(featureModels.bingo_cards);
		this.models = featureModels;
		this.registry = registry;
	}

	get coreModels() {
		return this.registry.getFeatureModels('core');
	}

	async getCardWithSpaces(cardId) {
		return await this.findByPk(cardId, {
			include: [
				{
					model: this.models.bingo_spaces,
					order: [['position', 'ASC']]
				}
			]
		});
	}
};

module.exports = BingoCardsRepository;