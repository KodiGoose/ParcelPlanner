const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoSubmissions = sequelize.define('bingo_submissions', {
		card_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		received_reward: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		submission_timestamp: {
			type: DataTypes.DATE,
			allowNull: true
		},
		approval_timestamp: {
			type: DataTypes.DATE,
			allowNull: true
		},
		approved_by: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});

	BingoSubmissions.associate = (models) => {
		BingoSubmissions.belongsTo(models.bingo_cards, {
			foreignKey: 'card_id',
			onDelete: 'CASCADE'
		});

		BingoSubmissions.belongsTo(models.bingo_cards, {
			foreignKey: 'approved_by',
			as: 'approver',
			onDelete: 'SET NULL'
		});
	};

	return BingoSubmissions;
};