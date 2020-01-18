import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const Ip = sequelize.define('group_ips', {
	ip: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	group_id: {
		type: Sequelize.INTEGER.UNSIGNED,
		unique: true,
	},
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true,
		allowNull: true,
	},
	ts: {
		type: Sequelize.DATE,
		default: Sequelize.NOW,
	},
	enabled: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		default: 0,
	},
}, {
	freezeTableName: true,
	timestamps: false,
	underscored: true,
})

Ip.sync({})


export default Ip
