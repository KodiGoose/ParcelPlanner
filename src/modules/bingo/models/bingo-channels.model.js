const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const BingoChannels = sequelize.define('bingo_channels', {
		channel_id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		is_log: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		is_play: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},
	{
		indexes: [
			{
				name: 'unique_log_per_guild',
				unique: true,
				fields: ['guild_id'],
				where: {
					is_log: true
				}
			}
		]
	});

	BingoChannels.associate = (models) => {
		BingoChannels.belongsTo(models.channels, {
			foreignKey: 'channel_id'
		});

		BingoChannels.belongsTo(models.guilds, {
			foreignKey: 'guild_id'
		});

		models.channels.hasOne(BingoChannels, {
			foreignKey: 'channel_id',
			onDelete: 'CASCADE'
		});

		models.guilds.hasMany(BingoChannels, {
			foreignKey: 'guild_id',
			onDelete: 'CASCADE'
		});
	};

	return BingoChannels;
};