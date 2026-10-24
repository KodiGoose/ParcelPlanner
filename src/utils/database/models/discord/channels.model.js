const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Channels = sequelize.define('channels', {
		channel_id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		for_bingo_log: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: false
		},
		for_bingo_play: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: false
		}
	},
	{
		indexes: [
			{
				name: 'unique_bingo_log_per_guild',
				unique: true,
				fields: ['guild_id', 'for_bingo_log'],
				where: {
					for_bingo_log: true
				}
			}
		]
	});

	Channels.associate = (models) => {
		Channels.belongsTo(models.guilds, {
			foreignKey: 'guild_id',
			onDelete: 'CASCADE'
		});

		Channels.hasMany(models.messages, {
			foreignKey: 'channel_id',
			onDelete: 'CASCADE'
		});
	};

	return Channels;
};