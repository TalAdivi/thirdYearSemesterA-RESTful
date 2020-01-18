import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const Order = sequelize.define('orders', {

	cnt: {
		type: Sequelize.INTEGER.UNSIGNED,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	},
	email: {
		type: Sequelize.STRING,
		// unique: true,
	},
	product: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	extra: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	first_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	company: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	billing_cycle: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	total: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	tax: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	bandwidth: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
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
	price_per_gb: {
		type: Sequelize.FLOAT,
		allowNull: false,
	},
	done_by: {
		type: Sequelize.STRING,
		defaultValue: 'GEOBOT',
		allowNull: false,
	},
	geo_link: {
		type: Sequelize.STRING(1250),
		defaultValue: 'WIZARD',
	},
	offer_link: {
		type: Sequelize.STRING(1250),
		defaultValue: 'WEB',
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
	// logging: logger.info,
	underscored: true,
	freezeTableName: true,
})

Order.sync({})

export default Order
