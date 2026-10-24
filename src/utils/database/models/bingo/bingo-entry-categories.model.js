const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoEntryCategories = sequelize.define('bingo_entry_categories', {
		entry_id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		category_id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		}
	},
	{
		timestamps: false
	});

	return BingoEntryCategories;
};