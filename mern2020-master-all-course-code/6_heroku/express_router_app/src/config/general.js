import { toBoolean, toInt } from 'validator'
import dotenv from 'dotenv'

global.Color = require('chalk')

global.NODE_ENV = process.env.NODE_ENV
global.FORCE_PRODUCTION = process.env.FORCE_PRODUCTION

// Force prodcution at local env.
const forceProduction = process.env.FORCE_PRODUCTION !== undefined

let env
if (forceProduction) {
	env = dotenv.config().parsed
	env.NODE_ENV = 'production'
	process.env.NODE_ENV = 'production'
} else if (process.env.NODE_ENV === 'LOCAL') env = dotenv.config().parsed
else env = process.env

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'
const isLocal = process.env.NODE_ENV === 'LOCAL'

export default {
	SERVICE_PORT: env.PORT || 3000,
	NODE_ENV: env.NODE_ENV,

	IS_DEVELOPMENT: isDevelopment,
	IS_PRODUCTION: isProduction,
	IS_LOCAL: isLocal,

	LOG_LEVEL: env.LOG_LEVEL,
	REQ_LOG: toBoolean(env.REQ_LOG),

	SERVICE_DB: {
		mongo: {
			username: env.MOGO_DB_USERNAME,
			password: env.MONGO_DB_PASSWORD,
			database: env.MONGO_DB_NAME,
			host: env.MONGO_DB_HOSTNAME,
			port: env.MONGO_DB_PORT,
		},
		mysql: isProduction ? {
			username: env.PROD_DB_USERNAME,
			password: env.PROD_DB_PASSWORD,
			database: env.PROD_DB_NAME,
			host: env.PROD_DB_HOSTNAME,
			port: env.PROD_DB_PORT,
		} : {
			username: env.DEV_DB_USERNAME,
			password: env.DEV_DB_PASSWORD,
			database: env.DEV_DB_NAME,
			host: env.DEV_DB_HOSTNAME,
			port: env.DEV_DB_PORT,
		},
		mysql_records: {
			username: env.RECORDS_DB_USERNAME,
			password: env.RECORDS_DB_PASSWORD,
			database: env.RECORDS_DB_NAME,
			host: env.RECORDS_DB_HOSTNAME,
			port: env.RECORDS_DB_PORT,
		},
	},
	DB_OPTIONS: {
		timezone: toBoolean(env.DB_OPTIONS_TIMEZONE),
		supportBigNumbers: toBoolean(env.DB_OPTIONS_SUPPORTBIGNUMBERS),
		dateStrings: toBoolean(env.DB_OPTIONS_DATESTRINGS),
		multipleStatements: toBoolean(env.DB_OPTIONS_MULTIPLESTATEMENTS),
		maxPoolConnections: toInt(env.DB_OPTIONS_MAXPOOLCONNECTIONS),
	},
	WPE_SERVER: isProduction ? {
		host: env.WPE_PROD_SERVER_HOST,
		port: env.WPE_PROD_SERVER_PORT,
		username: env.WPE_PROD_SERVER_USERNAME,
		password: env.WPE_PROD_SERVER_PASSWORD,
	} : {
		host: env.WPE_STG_SERVER_HOST,
		port: env.WPE_STG_SERVER_PORT,
		username: env.WPE_STG_SERVER_USERNAME,
		password: env.WPE_STG_SERVER_PASSWORD,
	},
	smtpConfig: {
		host: env.SMTP_HOST,
		port: toInt(env.SMTP_PORT),
		secure: toBoolean(env.SMTP_SECURE),
		auth: {
			user: env.SMTP_USER,
			pass: env.SMTP_PASS,
		},
	},
	SSR: {
		root_url: isLocal
			? `http://localhost:${env.PORT || 3000}`
			: `https://${isProduction ? 'api' : 'staging-api'}.geosurf.io`,

	},
	TOKEN_KEY: env.TOKEN_KEY,
	TOKEN_EXP: env.TOKEN_EXP,
	WPE_PATH: '/wp-content/themes/bridge/locations-api/',
	WPE_FNAME: 'loc-list.json',
	KEYS: [ env.HASH_KEY ],
	IP: [ env.TEST_IP ],
	DASHBOARD_BASE_URL: env.DASHBOARD_BASE_URL,
	HOST: isProduction ? [
		'https://client.geosurf.io',
		'https://www.geosurf.com',
		'https://geosurf.staging.wpengine.com',
		'https://geosurf.wpengine.com',
		'https://client-tmp.geosurf.io'
	] : [
		'https://geosurfnew.wpengine.com',
		'https://client.geosurf.io',
		'https://localhost',
		'https://www.geosurf.com',
		'https://geosurf.staging.wpengine.com',
		'https://localhost:3000',
		'https://null.jsbin.com',
		'https://127.0.0.1',
		'http://localhost:9000',
		'http://127.0.0.1:9000',
		'http://127.0.0.1',
		'http://localhost:4200'
	],
	mail_list: isDevelopment ? {
		agent: 'geos-testing@biscience.com',
		client: env.TESTERS.split(','),
	} : {
		agent: 'david.avigad@gmail.com',
		client: 'david.avigad@gmail.com',
	},
	default_agent: 'residential@geosurf.com',
}
/* '209.126.104.89', PATRON */
/* '209.126.107.33', DEV */
/* '185.23.175.16', OFFICE */
/* '104.198.110.66', GEOWEB */
/* '104.198.110.66', GEOWEBTEST */
