const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoThemes = sequelize.define('bingo_themes', {
		theme_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		theme: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		grid_constraints: {
			type: DataTypes.JSON,
			allowNull: false
		},
		is_center_free: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		}
	},
	{
		indexes: [
			{
				name: 'unique_themes_per_guild',
				unique: true,
				fields: ['guild_id', 'theme']
			}
		]
	});

	BingoThemes.associate = (models) => {
		BingoThemes.belongsTo(models.guilds, {
			foreignKey: 'guild_id'
		});

		BingoThemes.hasMany(models.bingo_schedules, {
			foreignKey: 'theme_id',
			onDelete: 'SET NULL'
		});

		models.guilds.hasMany(models.bingo_themes, {
			foreignKey: 'guild_id',
			onDelete: 'CASCADE'
		});
	};

	return BingoThemes;
};