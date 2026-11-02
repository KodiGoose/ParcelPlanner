const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Messages = sequelize.define('messages', {
		message_id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		channel_id: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	Messages.associate = (models) => {
		Messages.belongsTo(models.channels, {
			foreignKey: 'channel_id'
		});
	};

	return Messages;
};