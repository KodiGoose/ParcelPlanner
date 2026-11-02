const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Guilds = sequelize.define('guilds', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true
		}
	});

	Guilds.associate = (models) => {
		Guilds.hasMany(models.channels, {
			foreignKey: 'guild_id',
			onDelete: 'CASCADE'
		});

		// Join tables
		Guilds.belongsToMany(models.users, {
			through: models.guild_members,
			foreignKey: 'guild_id',
			otherKey: 'user_id',
			onDelete: 'CASCADE'
		});
	};

	return Guilds;
};