const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoSchedules = sequelize.define('bingo_schedules', {
		schedule_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		theme_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		start_timestamp: {
			type: DataTypes.DATE,
			allowNull: false
		},
		end_timestamp: {
			type: DataTypes.DATE,
			allowNull: false
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		}
	},
	{
		indexes: [
			{
				name: 'indexed_active_guilds',
				fields: ['guild_id', 'is_active']
			}
		]
	});

	BingoSchedules.associate = (models) => {
		BingoSchedules.belongsTo(models.guilds, {
			foreignKey: 'guild_id',
			onDelete: 'CASCADE'
		});

		BingoSchedules.belongsTo(models.bingo_themes, {
			foreignKey: 'theme_id'
		});

		BingoSchedules.hasMany(models.bingo_cards, {
			foreignKey: 'schedule_id',
			onDelete: 'CASCADE'
		});

		BingoSchedules.hasMany(models.bingo_submissions, {
			foreignKey: 'schedule_id'
		});

		// Join tables
		BingoSchedules.belongsToMany(models.bingo_categories, {
			through: models.bingo_schedule_categories,
			foreignKey: 'schedule_id',
			otherKey: 'category_id',
			onDelete: 'CASCADE'
		});
	};

	return BingoSchedules;
};