import Sequelize from 'sequelize'
import { s_records } from '../config/sequelize'

const Record = s_records.define('records', {
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
		allowNull: false,
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
	type: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	source_id: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	worker: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	os: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	version: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	uuid: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	nat: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	real_ip: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	ipfix: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	provider: {
		type: Sequelize.STRING,
		allowNull: true,
	},
}, {
	timestamps: false,
	freezeTableName: true,
})

Record.sync({})

export default Record
