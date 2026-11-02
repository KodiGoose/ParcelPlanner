const path = require('node:path');
const Sequelize = require('sequelize');

const { PATHS } = require('#utils/path-helper.js');

// Database setup.
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: path.join(PATHS.data, 'database.sqlite'),
	dialectOptions: {
		foreignKeys: true
	},
	define: {
		underscored: true
	}
});

const db = { sequelize, Sequelize };

function loadModel(modelPath) {
	const modelImport = require(modelPath);
	const model = modelImport(sequelize);

	console.log(`[DATABASE] Loading model: ${model.name}`);
	db[model.name] = model;

	return model;
}

/*
	Loads a model and immediately syncs the table.
	May cause issues so likely will remove.

function loadModelImmediately(modelPath) {
	loadModel(modelPath);


}*/

function applyAssociations() {
	Object.keys(db).forEach((modelName) => {
		if (modelName?.toLowerCase() === 'sequelize') {
			return;
		};

		if (db[modelName].associate) {
			db[modelName].associate(db);
		};
	});
}

async function initDatabase() {
	try {
		await db.sequelize.sync({
			alter: true
		});
	}
	catch (error) {
		console.log(`[CRITICAL] Could not initialize database, shutting down!\n > ${error}`);
		process.exit(1);
	}

	return db;
}

module.exports = {
	db,
	loadModel,
	applyAssociations,
	initDatabase
};