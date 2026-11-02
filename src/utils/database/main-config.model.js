const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const MainConfig = sequelize.define('main_configs', {
		module_name: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false
		},
		is_enabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false
		}
	},
	{
		timestamps: false
	});

	return MainConfig;
};