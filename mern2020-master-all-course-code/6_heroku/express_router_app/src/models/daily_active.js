import Sequelize from 'sequelize'
import { s_records } from '../config/sequelize'

const Daily_active = s_records.define('daily_active_ips', {
	/**
        id	int(50)	NO	PRI	NULL	auto_increment
        ip	char(30)	NO		0.0.0.0
        ts	timestamp	NO		0000-00-00 00:00:00
        ctr	char(30)	NO	MUL	N/A
        region	varchar(30)	YES		NULL
        city	varchar(30)	YES		NULL
        port	int(10)	NO		8080
        real_ip	char(30)	YES		NULL
        day	date	YES	MUL	curdate()
    */
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,           
		primaryKey: true,
	},
	ip: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: '0.0.0.0',
	},
	ts: {
		type: Sequelize.DATE,
	},
	ctr: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'N/A',
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
		allowNull: false,
		defaultValue: 8080,
	},
	real_ip: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	day: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		default: Sequelize.NOW,
	},
}, {
	timestamps: false,
	freezeTableName: true,
})

Daily_active.sync({})

export default Daily_active
