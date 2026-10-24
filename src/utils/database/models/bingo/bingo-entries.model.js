const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoEntries = sequelize.define('bingo_entries', {
		entry_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		entry: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		is_enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		}
	},
	{
		indexes: [
			{
				name: 'unique_entries_per_guild',
				unique: true,
				fields: ['guild_id', 'entry']
			},
			{
				name: 'indexed_enabled_entries',
				fields: ['guild_id', 'is_enabled']
			}
		]
	});

	BingoEntries.associate = (models) => {
		BingoEntries.belongsTo(models.guilds, {
			foreignKey: 'guild_id',
			onDelete: 'CASCADE'
		});

		BingoEntries.hasMany(models.bingo_spaces, {
			foreignKey: 'entry_id',
			onDelete: 'RESTRICT'
		});

		// Join tables
		BingoEntries.belongsToMany(models.bingo_categories, {
			through: models.bingo_entry_categories,
			foreignKey: 'entry_id',
			otherKey: 'category_id',
			onDelete: 'CASCADE'
		});
	};

	return BingoEntries;
};