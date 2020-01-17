/* global Color */

import { Sequelize } from 'sequelize'
import operatorsAliases from './op_aliases'
import CONFIG from './general'
import logger from './logger'

const {
	SERVICE_DB: { mysql, mysql_records }, NODE_ENV, DB_OPTIONS 
} = CONFIG

class SequelizeDB {
	constructor(config = null, options = {}) {
		this.config = config
		if (!config) {
			this.config = mysql
		}
		const {
			database, host, username, password, port 
		} = config
		this.sequelize = new Sequelize(
			database, username, password, {
				host,
				port,
				operatorsAliases,
				dialect: 'mysql',
				dialectOptions: {
					timezone: options.timezone || false,
					supportBigNumbers: true || options.multipleStatements || false,
					dateStrings: options.multipleStatements || false,
					multipleStatements: options.multipleStatements || false,
				},
				pool: {
					max: 10,
					min: 0,
					idle: 20000,
					acquire: 20000,
					evict: 5000,
				},
				logging: logger.debug,
			},
		)
		this.sequelize
			.authenticate()
			.then(() => logger.info('%s:: creating instance for schema %s at %s',
				this.constructor.name, Color.yellow(database), Color.magenta(NODE_ENV)))
			.catch(err => logger.error('Unable to connect to the database: %o', err))
		return this.sequelize
	}
}

const sequelize = new SequelizeDB(mysql, DB_OPTIONS)
const s_records = new SequelizeDB(mysql_records, DB_OPTIONS)

export { sequelize, s_records }
