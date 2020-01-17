import winston from 'winston'
import config from './general'
const { createLogger, format: winston_format, transports } = winston
const { combine, timestamp, printf, colorize, splat } = winston_format
const { LOG_LEVEL, IS_LOCAL } = config

const singleton = Symbol('singleton')
const singletonEnforcer = Symbol('singletonEnforcer')

class Logger {
	static get instance() {
		if (!this[singleton]) {
			this[singleton] = new Logger(singletonEnforcer)
		}
		return this[singleton].log
	}

	constructor(enforcer) {
		if (enforcer !== singletonEnforcer) { throw new Error('Cannot construct singleton') }
		const rules = IS_LOCAL ?
			[
				colorize(),
				splat(),
				timestamp(),
				printf(info => `${info.level}: ${info.message}`),
			] : [
				colorize(),
				splat(),
				timestamp(),
				printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
			]

		const format = combine(...rules)
		this.log = createLogger({
			format,
			level: LOG_LEVEL,
			transports: [ new transports.Console({format})],
		})

		this.log.stream = {
			write: (message, encoding) => {
				this.log.info(message)
			},
		}
	}
}
Logger.instance.warn('log level: %o', LOG_LEVEL)
export default Logger.instance

/*
Similarly, npm logging levels are prioritized from 0 to 5 (highest to lowest):

{
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}

*/

/*
	If we're not in production then log to the `console` with the format:
	`${info.timestamp} ${info.level}: ${message} JSON.stringify({ ...rest }) `
 */

/* Support in file transporter:
	const rules = isLocal
		? [
			colorize(),
			simple(),
			splat(),
		] : [
			colorize(),
			timestamp(),
			printf((info) => `${this.constructor.name}::${info.timestamp} ${info.level}: ${info.message}`),
			splat(),
		]

		const format = combine(...rules)
		this.log = createLogger({
		format,
		level: LOG_LEVEL,
		transports: [
			new transports.File({ filename: 'logs/error.log', level: 'error' }),
			new transports.File({ filename: 'logs/combined.log' }),
		],
		})
		if (isLocal) {
		this.log.add(new transports.Console({ format }))
 */
