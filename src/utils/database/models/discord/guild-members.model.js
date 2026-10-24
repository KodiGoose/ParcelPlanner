const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const GuildMembers = sequelize.define('guild_members', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true
		}
	},
	{
		timestamps: false
	});

	return GuildMembers;
};