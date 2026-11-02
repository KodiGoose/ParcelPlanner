const path = require('node:path');
const fs = require('node:fs');

const {
	PATHS,
	recursiveSearch,
	recursiveSearchSync
} = require('#utils/path-helper.js');

function loadEvent(eventDirent, client) {
	const event = require(eventDirent.path);

	if ('name' in event && 'execute' in event) {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
	else {
		console.log(`[ERROR] The event at ${path.relative(PATHS.root, eventDirent.path)} is missing a required "name" or "execute" property.`);
	}
}

function loadCommand(commandDirent, client) {
	const command = require(commandDirent.path);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[ERROR] The command at ${path.relative(PATHS.root, commandDirent.path)} is missing a required "data" or "execute" property.`);
	}
}

/*
	Technically it would be better to pass the model and repository into function.
	But not going to as they should be consistent outside of test cases.
*/
function loadMainConfig(registry, database) {
	const model = database.loadModel('#utils/database/main-config.model.js');

	const RepositoryClass = require('#utils/database/main-config.repository.js');
	const repositoryInstance = new RepositoryClass(model);

	registry.registerMainConfigModel(model);
	registry.registerMainConfigRepository(repositoryInstance);
}


/*
	Anything using the database or registry is done synchronously to prevent race conditions.
	Global events and commands dont and therefore can be async.
*/
async function loadGlobalEvents(client) {
	for await (const eventDirent of recursiveSearch(PATHS.events, '.event.js')) {
		loadEvent(eventDirent, client);
	};
};

async function loadGlobalCommands(client) {
	for await (const commandDirent of recursiveSearch(PATHS.commands, '.command.js')) {
		loadCommand(commandDirent, client);
	};
};

function loadModuleModels(moduleDirent, registry, database) {
	const modelsPath = path.join(moduleDirent.path, 'models');

	if (fs.existsSync(modelsPath)) {
		for (const modelDirent of recursiveSearchSync(modelsPath, '.model.js')) {
			const model = database.loadModel(modelDirent.path);

			registry.registerModuleModel(moduleDirent.name, model.name, model);
		};
	};
};

function loadModuleRepositories(moduleDirent, registry) {
	const repositoriesPath = path.join(moduleDirent.path, 'repositories');

	if (fs.existsSync(repositoriesPath)) {
		const moduleModels = registry.getModuleModels(moduleDirent.name);

		if (!moduleModels) {
			throw new Error(`[ERROR] Couldn't load repositories for module ${moduleDirent.name}, no models found!`);
		}

		for (const repositoryDirent of recursiveSearchSync(repositoriesPath, '.repository.js')) {
			const RepositoryClass = require(repositoryDirent.path);
			const repositoryInstance = new RepositoryClass(moduleModels, registry);

			const repositoryName = repositoryInstance.constructor.name;

			registry.registerModuleRepository(moduleDirent.name, repositoryName, repositoryInstance);
		};
	};
};

/*
	This needs changed to pass in the registry event handler.
*/
function loadModuleEvents(moduleDirent, client) {
	const eventsPath = path.join(moduleDirent.path, 'events');

	if (fs.existsSync(eventsPath)) {
		for (const eventDirent of recursiveSearchSync(eventsPath, '.event.js')) {
			loadEvent(eventDirent, client);
		}
	}
};


function loadModuleCommands(moduleDirent, client) {
	const commandsPath = path.join(moduleDirent.path, 'commands');

	if (fs.existsSync(commandsPath)) {
		for (const commandDirent of recursiveSearchSync(commandsPath, '.command.js')) {
			loadCommand(commandDirent, client);
		};
	};
};

function loadModuleConfig(moduleDirent, registry) {
	const configPath = path.join(moduleDirent.path, 'config.js');

	if (fs.existsSync(configPath)) {
		const config = require(configPath);
		registry.registerModuleConfig(moduleDirent.name, config);

		return config;
	};
};

module.exports = {
	loadMainConfig,
	loadGlobalEvents,
	loadGlobalCommands,
	loadModuleModels,
	loadModuleRepositories,
	loadModuleEvents,
	loadModuleCommands,
	loadModuleConfig
};