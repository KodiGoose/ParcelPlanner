const fs = require('node:fs');
const path = require('node:path');
const Sequelize = require('sequelize');

// Database setup.
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: path.join(process.cwd(), 'data', 'database.sqlite'),
	dialectOptions: {
		foreignKeys: true
	},
	define: {
		underscored: true
	}
});

const db = { sequelize, Sequelize };

const modelsDirectory = path.join(__dirname, 'models');

function loadModels(baseDirectory) {
	const items = fs.readdirSync(baseDirectory);

	for (const item of items) {
		const itemPath = path.join(baseDirectory, item);

		try {
			if (fs.statSync(itemPath).isDirectory()) {
				loadModels(itemPath);
			}
			else if (item.endsWith('.js')) {
				const modelImport = require(itemPath);
				const model = modelImport(sequelize);

				console.log(`[DATABASE] Loading model: ${model.name}`);
				db[model.name] = model;
			}
		}
		catch {
			console.log(`[WARNING] Could not process ${itemPath} while initializing database.`);
		}
	};
};

loadModels(modelsDirectory);

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

module.exports = db;