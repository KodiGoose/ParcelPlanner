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
		rerolls_left: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		is_locked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		message_id: {
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
			foreignKey: 'schedule_id',
			onDelete: 'CASCADE'
		});

		BingoCards.belongsTo(models.users, {
			foreignKey: 'user_id',
			onDelete: 'CASCADE'
		});

		BingoCards.belongsTo(models.messages, {
			foreignKey: 'message_id'
		});

		BingoCards.hasMany(models.bingo_spaces, {
			foreignKey: 'card_id',
			onDelete: 'CASCADE'
		});

		BingoCards.hasOne(models.bingo_submissions, {
			foreignKey: 'card_id',
			onDelete: 'CASCADE'
		});
	};

	return BingoCards;
};