const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Users = sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true
		}
	});

	Users.associate = (models) => {
		// Join tables
		Users.belongsToMany(models.guilds, {
			through: models.guild_members,
			foreignKey: 'user_id',
			otherKey: 'guild_id',
			onDelete: 'CASCADE'
		});
	};

	return Users;
};