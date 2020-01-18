import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const Record_Remote = sequelize.define('records_with_gw_ports', {
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
	},
	ip: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	ts: {
		type: Sequelize.DATE,
	},
	ctr: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	region: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	city: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	port: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	source_id: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	uuid: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	country_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	country_port: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
}, {
	timestamps: false,
	freezeTableName: true,
})

Record_Remote.sync({})

export default Record_Remote
