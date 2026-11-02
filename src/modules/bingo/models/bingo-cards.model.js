const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoCards = sequelize.define('bingo_cards', {
		card_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		schedule_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		user_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		message_id: {
			type: DataTypes.STRING,
			allowNull: true
		},
		rerolls_left: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		// drafting, playing, submitted, winner, completed
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'draft'
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
	},
	{
		indexes: [
			{
				name: 'unique_users_per_schedule',
				unique: true,
				fields: ['user_id', 'schedule_id']
			}
		]
	});

	BingoCards.associate = (models) => {
		BingoCards.belongsTo(models.bingo_schedules, {
			foreignKey: 'schedule_id'
		});

		BingoCards.belongsTo(models.users, {
			foreignKey: 'user_id',
			targetKey: 'user_id',
			as: 'player'
		});

		BingoCards.belongsTo(models.users, {
			foreignKey: 'approved_by',
			targetKey: 'user_id',
			as: 'approver'
		});

		BingoCards.belongsTo(models.messages, {
			foreignKey: 'message_id'
		});

		BingoCards.hasMany(models.bingo_spaces, {
			foreignKey: 'card_id',
			onDelete: 'CASCADE'
		});

		models.users.hasMany(models.bingo_cards, {
			foreignKey: 'user_id',
			as: 'player',
			onDelete: 'CASCADE'
		});

		models.users.hasMany(models.bingo_cards, {
			foreignKey: 'approved_by',
			as: 'approver',
			onDelete: 'SET NULL'
		});

		models.messages.hasOne(models.bingo_cards, {
			foreignKey: 'message_id',
			onDelete: 'SET NULL'
		});
	};

	return BingoCards;
};