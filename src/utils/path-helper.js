const path = require('node:path');
const fs = require('node:fs');

const ROOT = path.resolve(__dirname, '..', '..');

async function* recursiveSearch(baseDirectory, endFilter = null) {
	const items = await fs.promises.readdir(baseDirectory, { withFileTypes: true });

	for (const item of items) {
		const itemPath = path.join(baseDirectory, item.name);

		if (item.isDirectory()) {
			yield* recursiveSearch(itemPath, endFilter);
		}

		if (!endFilter || item.name.endsWith(endFilter)) {
			yield {
				name: item.name,
				path: itemPath
			};
		}
	}
};

function* recursiveSearchSync(baseDirectory, endFilter = null) {
	const items = fs.readdirSync(baseDirectory, { withFileTypes: true });

	for (const item of items) {
		const itemPath = path.join(baseDirectory, item.name);

		if (item.isDirectory()) {
			yield* recursiveSearchSync(itemPath, endFilter);
		}

		if (!endFilter || item.name.endsWith(endFilter)) {
			yield {
				name: item.name,
				path: itemPath
			};
		}
	}
};

async function* getDirectoryFolders(baseDirectory) {
	const items = await fs.promises.readdir(baseDirectory, { withFileTypes: true });

	for (const item of items) {
		if (item.isDirectory()) {
			yield {
				name: item.name,
				path: path.join(baseDirectory, item.name)
			};
		}
	}
}

function* getDirectoryFoldersSync(baseDirectory) {
	const items = fs.readdirSync(baseDirectory, { withFileTypes: true });

	for (const item of items) {
		if (item.isDirectory()) {
			yield {
				name: item.name,
				path: path.join(baseDirectory, item.name)
			};
		}
	}
}

async function verifySubfolder(baseDirectory, folderName) {
	const checkPath = path.join(baseDirectory, folderName);
	const fileStats = await fs.stat(checkPath);

	return fileStats.isDirectory();
}

function verifySubfolderSync(baseDirectory, folderName) {
	const checkPath = path.join(baseDirectory, folderName);
	const fileStats = fs.statSync(checkPath);

	return fileStats.isDirectory();
}

module.exports = {
	PATHS: {
		root: ROOT,
		src: path.join(ROOT, 'src'),
		data: path.join(ROOT, 'data'),
		commands: path.join(ROOT, 'src', 'commands'),
		events: path.join(ROOT, 'src', 'events'),
		modules: path.join(ROOT, 'src', 'modules'),
		utils: path.join(ROOT, 'src', 'utils')
	},
	recursiveSearch,
	recursiveSearchSync,
	getDirectoryFolders,
	getDirectoryFoldersSync,
	verifySubfolder,
	verifySubfolderSync
};