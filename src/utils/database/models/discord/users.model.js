const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Users = sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true
		}
	});

	Users.associate = (models) => {
		Users.hasMany(models.bingo_cards, {
			foreignKey: 'user_id',
			onDelete: 'CASCADE'
		});

		Users.hasMany(models.bingo_submissions, {
			foreignKey: 'approved_by',
			as: 'approver',
			onDelete: 'SET NULL'
		});

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