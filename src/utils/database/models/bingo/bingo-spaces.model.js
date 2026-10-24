const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoSpaces = sequelize.define('bingo_spaces', {
		space_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		card_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		entry_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		position: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		is_marked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},
	{
		timestamps: false,
		indexes: [
			{
				name: 'unique_position_per_card',
				unique: true,
				fields: ['card_id', 'position']
			}
		]
	});

	BingoSpaces.associate = (models) => {
		BingoSpaces.belongsTo(models.bingo_cards, {
			foreignKey: 'card_id'
		});

		BingoSpaces.belongsTo(models.bingo_entries, {
			foreignKey: 'entry_id'
		});
	};

	return BingoSpaces;
};