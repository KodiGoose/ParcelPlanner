const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoScheduleCategories = sequelize.define('bingo_schedule_categories', {
		schedule_id: {
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

	return BingoScheduleCategories;
};