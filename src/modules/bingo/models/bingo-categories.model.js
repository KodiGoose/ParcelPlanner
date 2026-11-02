const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoCategories = sequelize.define('bingo_categories', {
		category_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		category: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	},
	{
		indexes: [
			{
				name: 'unique_categories_per_guild',
				unique: true,
				fields: ['guild_id', 'category']
			}
		]
	});

	BingoCategories.associate = (models) => {
		BingoCategories.belongsTo(models.guilds, {
			foreignKey: 'guild_id'
		});

		// Join tables
		BingoCategories.belongsToMany(models.bingo_schedules, {
			through: models.bingo_schedule_categories,
			foreignKey: 'category_id',
			otherKey: 'schedule_id',
			onDelete: 'CASCADE'
		});

		BingoCategories.belongsToMany(models.bingo_entries, {
			through: models.bingo_entry_categories,
			foreignKey: 'category_id',
			otherKey: 'entry_id',
			onDelete: 'CASCADE'
		});

		models.guilds.hasMany(models.bingo_categories, {
			foreignKey: 'guild_id',
			onDelete: 'CASCADE'
		});
	};

	return BingoCategories;
};