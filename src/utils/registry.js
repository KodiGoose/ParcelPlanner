const EventEmitter = require('node:events');

/*
	Might be worth changing to proper get functions.

	Should add additional registering for messages / similar.
	Events and commands don't need registered since they listen to event handler.
*/
class ModuleRegistry {
	constructor() {
		this.modules = {};

		this.MainConfigModel = null;
		this.MainConfigRepository = null;

		this.eventHandler = new EventEmitter();
	}

	/*
		Currently attempts to initialize a module any time it is used.
		May be more efficient to have an initializeModule function.
		Would need to ensure it always was used beforehand though.
	*/
	#prepareModule(moduleName) {
		if (!this.modules[moduleName]) {
			this.modules[moduleName] = {
				models: {},
				repositories: {},
				config: {},
				isEnabled: false
			};

			console.log(`[REGISTRY] Registered module ${moduleName}!`);
		};
	}

	getModuleModel(moduleName, modelName) {
		const model = this.modules[moduleName]?.models[modelName];

		if (model) {
			return model;
		}
	}

	getModuleModels(moduleName) {
		const models = this.modules[moduleName]?.models;

		if (models) {
			return models;
		}
	}

	getModulesRepository(moduleName, repositoryName) {
		const repository = this.modules[moduleName]?.repositories[repositoryName];

		if (repository) {
			return repository;
		}
	}

	getModulesRepositories(moduleName) {
		const repositories = this.modules[moduleName]?.repositories;

		if (repositories) {
			return repositories;
		}
	}

	getModulesConfig(moduleName) {
		const config = this.modules[moduleName]?.config;

		if (config) {
			return config;
		}
	}

	getModuleEnabledState(moduleName) {
		const enabledState = this.modules[moduleName]?.isEnabled;

		if (typeof enabledState === 'boolean') {
			return enabledState;
		}
	}

	registerMainConfigModel(model) {
		this.MainConfigModel = model;

		console.log('[REGISTRY] Registered main config model!');
	}

	registerMainConfigRepository(repository) {
		this.MainConfigRepository = repository;

		console.log('[REGISTRY] Registered main config repository!');
	}

	registerModuleModel(moduleName, modelName, model) {
		this.#prepareModule(moduleName);
		this.modules[moduleName].models[modelName] = model;

		console.log(`[REGISTRY] Registered model ${modelName} for module ${moduleName}!`);
	}

	registerModuleRepository(moduleName, repositoryName, repository) {
		this.#prepareModule(moduleName);
		this.modules[moduleName].repositories[repositoryName] = repository;

		console.log(`[REGISTRY] Registered repository ${repositoryName} for module ${moduleName}!`);
	}

	registerModuleConfig(moduleName, config) {
		this.#prepareModule(moduleName);
		this.modules[moduleName].config = config;

		console.log(`[REGISTRY] Registered config for module ${moduleName}!`);
	}

	setModuleEnabledState(moduleName, enabledState) {
		if (moduleName === 'core' && enabledState === false) {
			console.log('[WARNING] An attempt to disable the core module was denied!');
			return;
		}
		this.#prepareModule(moduleName);
		this.modules[moduleName].isEnabled = enabledState;

		console.log(`[REGISTRY] Module ${moduleName} enabled state set as ${enabledState}!`);
	}
}

module.exports = ModuleRegistry;