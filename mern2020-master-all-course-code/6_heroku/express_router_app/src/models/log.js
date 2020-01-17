import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const Log = sequelize.define('log_sum_traffic_logs', {
	/*
        CREATE TABLE `log_sum_traffic_logs` (
            `id` int(50) NOT NULL AUTO_INCREMENT,
            `group_id` mediumint(9) NOT NULL,
            `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `client_ip` varchar(20) NOT NULL DEFAULT 'N/A',
            `gw_ip` varchar(20) NOT NULL DEFAULT 'N/A',
            `up_bytes` bigint(20) DEFAULT '0',
            `down_bytes` bigint(20) DEFAULT '0',
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=488545 DEFAULT CHARSET=utf8;
        */
	id: {
		type: Sequelize.INTEGER(50),
		primaryKey: true,
		autoIncrement: true,
	},
	group_id: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
	},
	ts: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	client_ip: {
		type: Sequelize.STRING,
		defaultValue: 'N/A',
	},
	gw_ip: {
		type: Sequelize.STRING,
		defaultValue: 'N/A',
	},
	up_bytes: {
		type: Sequelize.BIGINT(50),
		allowNull: true,
	},
	down_bytes: {
		type: Sequelize.BIGINT(50),
		allowNull: true,
	},
}, {
	timestamps: false,
	freezeTableName: true,
})


Log.sync({})

export default Log
