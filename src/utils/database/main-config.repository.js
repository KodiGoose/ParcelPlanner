const BaseRepository = require('#utils/database/base.repository.js');
const { Op } = require('sequelize');

class MainConfigRepository extends BaseRepository {
	constructor(model) {
		super(model);
	}

	async getModuleEnabledState(moduleName) {
		return await this.findByPk(moduleName);
	}

	async getModuleEnabledStates(moduleNames) {
		const moduleRows = await this.findAll({
			where: {
				module_name: {
					[Op.in]: moduleNames
				}
			},
			attributes: [
				'module_name',
				'is_enabled'
			]
		});

		const moduleStates = moduleRows.reduce((acc, row) => {
			acc[row.module_name] = row.is_enabled;

			return acc;
		}, {});

		return moduleStates;

	}

	async setModuleEnabledState(moduleName, enableState) {
		return await this.upsert({
			module_name: moduleName,
			is_enabed: enableState
		});
	}

	/*
		Use to clean up database when a module is permanently removed.
	*/
	async registrySync(registry) {
		currentModules = Object.keys(registry.modules);

		await this.destroy({
			where: {
				module_name: {
					[Op.notIn]: currentModules
				}
			}
		});
	}
};

module.exports = MainConfigRepository;