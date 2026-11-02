const database = require('#utils/database/database.js');
const RegistryClass = require('#utils/registry.js');

const { Graph } = require('#utils/sorting-helper.js');

const {
	PATHS,
	getDirectoryFoldersSync
} = require('#utils/path-helper.js');

const {
	loadMainConfig,
	loadGlobalEvents,
	loadGlobalCommands,
	loadModuleModels,
	loadModuleRepositories,
	loadModuleEvents,
	loadModuleCommands,
	loadModuleConfig
} = require('#utils/module-loader.js');

/*
	Right now the 'core' module is required and hard coded.
	For future switching to a stored config variable may be better.
*/
const CORE_NAME = 'core';

async function initializeBot(client) {
	const registry = new RegistryClass();

	loadMainConfig(registry, database);
	loadGlobalEvents(client);
	loadGlobalCommands(client);

	/*
		getDirectoryFoldersSync returns an iterator so we instead store them in a Map.
		This preserves the original dirent objects but allows easier lookups / comparisons.
	*/
	const moduleDirentsMap = new Map(Array.from(getDirectoryFoldersSync(PATHS.modules), dirent => [dirent.name, dirent]));
	const dependencyGraph = new Graph();

	if (!moduleDirentsMap.has(CORE_NAME)) {
		throw new Error('[ERROR] Unable to find the required core module!');
	}

	for (const moduleDirent of moduleDirentsMap.values()) {
		loadModuleModels(moduleDirent, registry, database);

		// First part is redundant but kept for if node data storage is changed in future.
		if (moduleDirent.name === CORE_NAME) {
			dependencyGraph.ensureNode(CORE_NAME);
		}
		else {
			const moduleConfig = loadModuleConfig(moduleDirent, registry);

			if (Array.isArray(moduleConfig?.dependencies)) {
				const missingDependency = moduleConfig.dependencies.find(name => !(name in moduleDirentsMap));

				if (missingDependency === true) {
					throw new Error(`[ERROR] Module ${moduleDirent.name} has a broken dependency, ${missingDependency}! Check capitalization and folders!`);
				}

				dependencyGraph.addNodesByInEdges(moduleDirent.name, moduleConfig.dependencies);
			}

			// Redundancy to ensure 'core' always loads first regardless of configs.
			dependencyGraph.addParentNode(moduleDirent.name, CORE_NAME);
		}
	};

	database.applyAssociations();
	await database.initDatabase();

	const orderedModules = dependencyGraph.kahnsTopSort();
	const moduleStates = await registry.MainConfigRepository.getModuleEnabledStates(orderedModules);

	for (moduleName of orderedModules) {
		const moduleDirent = moduleDirentsMap.get(moduleName);

		loadModuleRepositories(moduleDirent, registry);

		// This likely needs changed to pass in registry for the event handler.
		loadModuleEvents(moduleDirent, client);
		loadModuleCommands(moduleDirent, client);

		/*
			THIS IS BACKWARDS!

			New entries ot the database return undefined.
		*/
		const moduleState = moduleStates.moduleName;

		if (typeof moduleState === 'boolean') {
			registry.setModuleEnabledState(moduleName, moduleState);
		}
		else {
			await registry.MainConfigRepository.setModuleEnabledState(moduleName, true);
			registry.setModuleEnabledState(moduleName, true);
		}

	}
};

module.exports = {
	initializeBot
};