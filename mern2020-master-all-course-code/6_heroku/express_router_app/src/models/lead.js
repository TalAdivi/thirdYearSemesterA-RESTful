import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const Lead = sequelize.define('upgrade_WLs', {

	cnt: {
		type: Sequelize.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true,
	},
	group_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	name: Sequelize.STRING,
	email: {
		type: Sequelize.STRING,
	},
	total: Sequelize.DECIMAL,
	company: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	price_per_gb: Sequelize.FLOAT,
	agent: {
		type: Sequelize.STRING,
		defaultValue: 'WEB',
		allowNull: false,
	},
	status: {
		type: Sequelize.STRING,
		defaultValue: 'OPEN',
		allowNull: false,
	},
	tos_approved: {
		type: Sequelize.STRING(5),
		defaultValue: 'YES',
	},
	ip: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	ip_location: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	country: {
		type: Sequelize.STRING,
		allowNull: true,
	},
}, {
	underscored: true,
})

Lead.sync({})


export default Lead
