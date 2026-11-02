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
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	Channels.associate = (models) => {
		Channels.belongsTo(models.guilds, {
			foreignKey: 'guild_id'
		});

		Channels.hasMany(models.messages, {
			foreignKey: 'channel_id',
			onDelete: 'CASCADE'
		});
	};

	return Channels;
};