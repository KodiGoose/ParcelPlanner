/*
	https://sequelize.org/api/v6/class/src/model.js
*/
module.exports = class BaseRepository {
	constructor(model) {
		this.model = model;
	}

	// Create
	async create(values, options = {}) {
		return await this.model.create(values, options);
	}

	async bulkCreate(records, options = {}) {
		return await this.model.create(records, options);
	}

	async upsert(values = {}, options = {}) {
		return await this.model.upsert(values, options);
	}

	// Read
	async count(options = {}) {
		return await this.model.count(options);
	}

	async exists(options = {}) {
		const count = await this.model.count(options);
		return count > 0;
	}

	async findAll(options = {}) {
		const cappedOptions = {
			...options,
			limit: options.limit || 1000
		};

		return await this.model.findAll(cappedOptions);
	}

	async findByPk(pk, options = {}) {
		return await this.model.findByPk(pk, options);
	}

	async findOne(options = {}) {
		return await this.model.findOne(options);
	}

	async max(field, options = {}) {
		return await this.model.max(field, options);
	}

	async min(field, options = {}) {
		return await this.model.min(field, options);
	}

	async sum(field, options = {}) {
		return await this.model.sum(field, options);
	}

	// Update
	async update(values = {}, options = {}) {
		return await this.model.update(values, options);
	}

	async increment(field, options = {}) {
		return await this.model.increment(field, options);
	}

	async decrement(field, options = {}) {
		return await this.model.decrement(field, options);
	}

	// Delete
	async destroy(options = {}) {
		if (Object.keys(options?.where ?? {}).length === 0) {
			throw new Error(`[ERROR] Deletion blocked in ${this.model.name} due to empty "where" clause.`);
		}

		return await this.model.destroy(options);
	}
};