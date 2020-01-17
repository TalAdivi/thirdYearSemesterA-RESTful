/* eslint no-use-before-define: 0 */
import Boom from 'boom'
import { isNumber } from 'util'
import { isBoolean, toBoolean } from 'validator'
import { validationResult } from 'express-validator/check'
import {
	difference, concat, isArray, isEmpty,
} from 'lodash'
import jwt from 'jsonwebtoken'
import moment, { unix } from 'moment'
import { hash } from './util'
import queries from '../models/queries'
import { Ip, Account } from '../models/_index'
import logic from './accounts.logic'
import ipinfo from './ipinfo.mdl'
import config from '../config/general'
import logger from '../config/logger'
import mailer from '../mailer'

const { sequelize } = Ip
const { TOKEN_EXP, TOKEN_KEY, DASHBOARD_BASE_URL } = config
// Router functions:
export default {
	login: async (req, res) => {
		if (!check_input(req, res)) return 0

		const token = req.get('authorization')
		const decoded_token = Buffer.from(token.split(' ')[1], 'base64').toString('ascii')
		const [ email = null, password = null ] = decoded_token.split(':')
		const q = queries.login(email, hash(password))

		const [ query ] = await Account.sequelize.query(q, {
			type: sequelize.QueryTypes.SELECT,
		})
		const { success = null, group_id = null } = query

		if (success && group_id) {
			return jwt.sign(
				{ email, group_id },
				TOKEN_KEY,
				{ expiresIn: TOKEN_EXP },
				(err, token) => {
					if (err) throw Boom.unauthorized(err.message)
					return res.json({ token })
				},
			)
		}
		throw Boom.unauthorized('user not active nor exists')
	},
	remove_all_ips: async (req, res) => {
		logger.warn('Running admin function')
		logger.debug('req.params: %o', req.params)
		const { id } = req.params
		const query = await Ip.destroy({ where: { group_id: id } })
		logger.info(`Affected rows: ${query}`)
		res.send(`Affected rows: ${query}`)
	},
	update_ips: async (req, res) => {
		logger.debug('req.params: ', req.method === 'POST' ? req.body : req.query)
		const { account = null } = res.locals
		const { id } = account
		logger.debug(typeof req.method)
		if (!(req.method === 'POST' || req.method === 'GET')) throw Boom.methodNotAllowed('Request method should be GET or POST only!')
		let ips = null

		if (req.method === 'POST' && isArray(req.body) && !isEmpty(req.body)) ips = req.body
		else if (req.method === 'GET' && req.query && !isEmpty(req.query.ips)) ips = req.query.ips.split(';')
		else throw Boom.notAcceptable('Input not valid! Expected: Array[value(s)] OR ips=...')

		const op = req.params.op.toUpperCase()

		if (!ips || !isArray(ips) || isEmpty(ips)) throw Boom.notAcceptable('Input not valid! Expected: Array[value(s)]OR ips=...')
		switch (op) {
		case 'ADD': {
			const senitized = logic.senitize(ips, id, true)
			const query = await Ip.findAll({
				where: { ip: { $in: senitized } },
				attributes: [ 'ip' ],
			})

			const rejected_ips = query.map(obj => obj.ip)
			if (rejected_ips.length > 0) {
				throw Boom.conflict(`Unable to process the request. IP(s): [${rejected_ips}] already exists in the system.`)
			}
			const approved_ips = difference(senitized, rejected_ips)

			const final = concat(
				logic.to_object(rejected_ips, 'added', false),
				logic.to_object(approved_ips, 'added', true),
			)

			const whitelist = logic.senitize(approved_ips, id, false)

			Ip.bulkCreate(whitelist)
				.then(() => res.send(final))
				.catch((err) => { throw err })
			break
		}
		case 'REMOVE': {
			const senitized = logic.senitize(ips, id, true)
			const query = await Ip.findAll({
				where: { group_id: id },
				attributes: [ 'ip' ],
			})
			const exist_ips = query.map(obj => obj.ip)
			const to_delete_ips = difference(senitized, exist_ips)
			if (to_delete_ips.length > 0) {
				throw Boom.badRequest('Please include only IPs which are enabled in your account')
			}

			const updated_list = await Ip.destroy({ where: { ip: senitized, group_id: id } })
				.then(() => account.getIps())
				.then(ans => ans.map(obj => obj.ip))
				.catch((err) => { throw err })

			const final = concat(
				logic.to_object(updated_list, 'removed', false),
				logic.to_object(senitized, 'removed', true),
			)

			res.send(final)

			break
		}
		case 'ENABLE':
		case 'DISABLE': {
			const enabled = op === 'ENABLE' ? 1 : 0
			const senitized = logic.senitize(ips, id, true)
			const query = await Ip.findAll({
				where: {
					group_id: id,
				},
				attributes: [ 'ip', 'enabled' ],
			})
			const account_ips = query.map(obj => obj.ip)

			if ((difference(senitized, account_ips)).length > 0) {
				throw Boom.badRequest('Please include only IPs which are enabled in your account')
			}

			const updated_list = await Ip.update({
				enabled,
			}, {
				where: {
					ip: senitized,
					group_id: id,
				},
				fields: [ 'enabled' ],
			})
				.then(() => account.getIps())
				.then(ans => ans.map(obj => Object({
					ip: obj.ip,
					enabled: obj.enabled,
				})))
				.catch((err) => { throw err })

			res.send(updated_list)

			break
		}

		default:
			throw Boom.conflict('Operation not allowed')
		}
	},
	update_blacklist: async (req, res) => {
		logger.debug('req.params: %o', req.body)
		if (!req.query) throw Boom.badData('Empty values!')
		const { domain = null } = req.query // req.query.domains.split(';')
		if (!domain) throw Boom.badData('Wrong data!')
		const q = `INSERT IGNORE blacklist (domain) VALUES ('${domain}');`
		const query = await sequelize.query(q, { type: sequelize.QueryTypes.UPDATE })
		const updated = query[1]
		res.send({ domain, updated })
	},
	billing: async (req, res) => {
		logger.debug('req.params: %o', req.query)
		const {
			threshold = null,
			limit = null,
		} = req.query
		if (!threshold || !isNumber(Number(threshold)) || threshold <= 0) throw Boom.badData('Please set diffrent threshold!')

		const q = `SELECT g.id account_id,
                            TRUNCATE(b.balance, 2) current_balance,
                            g.is_active,
                            g.account_owner
                        FROM   groups g
                            LEFT JOIN group_balance_view b
                                    ON g.id = b.group_id
                        WHERE  b.balance <= ${threshold} AND g.is_active = true
                        ORDER  BY b.balance DESC
                        LIMIT  ${limit || '5000'};`
		const query = await sequelize.query(q, { type: sequelize.QueryTypes.SELECT })
		const response = {
			time_stamp: new Date().toUTCString(),
			balance_threshold: threshold,
			accounts_meeting_balance_threshold: query.length,
			max_rows: limit || 5000,
			data: query,
		}
		res.json(query ? response : 'Error!')
	},
	info: async (req, res) => {
		logger.debug('req.query: %o', req.query)
		try {
			const country_code = await ipinfo.countryCode(req.headers['x-forwarded-for'] || req.ip)
			const {
				account_id = null,
			} = req.query // NOTE: sf_info = null, tax = true

			if (!account_id || !isNumber(Number(account_id))) throw Boom.badData('account id can\'t be empty!')

			const q = `
            SELECT id 'account_id', tax, company, groups.name contact_name, email, p.plan_id, p.name plan_name, p.price, p.plan_amount, p.billing, p.product 
            FROM groups join group_plan p
            ON groups.id = p.group_id
            WHERE groups.id = ${Number(account_id)} 
            LIMIT 1`

			return sequelize
				.query(q, {
					type: sequelize.QueryTypes.SELECT,
				})
				.then((result) => {
					return result[0]
						? res
							.status(200)
							.json({
								...result[0],
								req_country_code: country_code || null,
							})
						: res
							.status(404)
							.json('account not found!')
				}).catch((err) => {
					throw err
				})
		} catch (e) {
			return res.status(400).send('can\'t find IP location')
		}
	},
	manage_account: async (req, res) => {
		logger.debug('req.params: %o', req.query)
		const { account_id = null, is_active = null } = req.query
		const isActiveValid = isBoolean(String(is_active))
		if (!account_id || !is_active === null || !isActiveValid || !isNumber(Number(account_id))) throw Boom.badData('Please check your query parameters!')

		const q = ` UPDATE groups SET is_active = ${toBoolean(is_active)} WHERE id = ${account_id};
                    SELECT id account_id, email, is_active, TRUNCATE(b.balance, 2) balance
                    FROM groups g join group_balance_view b
                    ON g.id = b.group_id
                    WHERE id = ${account_id};`
		const query = await sequelize.query(q, { type: sequelize.QueryTypes.SELECT })
		const isValidRes = query[0] || false
		res.json(isValidRes ? query[1][0] : 'Error!')
	},
	group_info: async (req, res) => {
		const { email = null } = req.query
		if (!email) throw Boom.badData('email is missing')
		const result = await Account
			.findOne({
				where: { email },
				attributes: [ 'id', 'is_active' ],
				include: [ 'current_balance' ],
			})
		if (!result) throw Boom.badData('email doesn\'t exist')
		else if (!result.current_balance || result.current_balance.balance <= 0) throw Boom.badData('insufficient balance')
		return res.json({ group_id: result.id })
	},
	check_email: async (req, res) => {
		if (!check_input(req, res)) return 0

		const { email } = req.body
		const mailbot = await mailer
		const result = await Account
			.findOne({
				where: { email },
				attributes: [ 'id', 'email', 'name' ],
			})

		if (!isEmpty(result)) {
			jwt.sign({
				email,
				group_id: result.id,
			}, TOKEN_KEY, {
				expiresIn: TOKEN_EXP,
			}, (err, token) => {
				if (err) throw err
				const message = {
					message: {
						to: result.email,
						subject: 'Welcome to Geosurf!',
					},
					template: 'c_change_password',
					locals: {
						name: result.name,
						token,
						url: DASHBOARD_BASE_URL,
					},
				}
				mailbot.sendEmail(message)
			})
			return res.status(200).json({ message: `Reset password link sent to ${email}` })
		}
		throw Boom.unauthorized('This email address does not exist.')
	},
	change_password: (req, res) => {
		if (!check_input(req, res)) return 0

		const { old_password = null, new_password } = req.body
		const decoded_new_password = buffer2string(new_password)
		const { account } = res.locals

		if ((old_password && !(hash(buffer2string(old_password)) === account.password))) {
			throw Boom.conflict('Old password does not match. Please try again.')
		}
		// case: register new pass || old pass is valid
		return account
			.update({ password: hash(decoded_new_password) })
			.then(async () => {
				const mailbot = await mailer
				const message1 = {
					message: {
						to: account.email,
						subject: 'Your password has been changed',
					},
					template: 'c_reset_password',
					locals: {
						name: account.name,
						account_id: account.id,
						date: moment().format('MM/DD/YYYY'),
						time: moment().format('HH:mm'),
					},
				}
				const message2 = {
					message: {
						to: config.default_agent,
						subject: 'Password Changed',
					},
					template: 't_reset_password',
					locals: {
						account_id: account.id,
						password: decoded_new_password,
						date: moment().format('MM/DD/YYYY'),
						time: moment().format('HH:mm'),
					},
				}
				mailbot.sendEmail(message1)
				mailbot.sendEmail(message2)
				return res.status(200).send('Password has been changed.')
			}).catch((e) => { throw e })
	},
	reset_password: (req, res) => {
		const { token } = req.params
		return jwt.verify(token, TOKEN_KEY, (err) => {
			if (err) throw Boom.unauthorized(err.message)
			res.status(200).send('token is ok')
		})
	},
	balance: (req, res) => {
		const { account: { current_balance: { cost: spent, amount, balance } } } = res.locals
		if (!balance) throw Boom.badData('information not found')
		const response = {
			spent: Number(Number(spent).toFixed(2)),
			amount: Number(Number(amount).toFixed(2)),
			balance: Number(Number(balance).toFixed(2)),
		}
		res.json(response)
	},
	payments: (req, res) => {
		const { account: { payments } } = res.locals
		if (!payments) throw Boom.badData('information not found')

		const response = payments.map(pay => ({
			date: pay.ts,
			transactionId: pay.trans_id,
			value: Number(pay.charged_amount),
		}))
		res.json(response)
	},
	get_account_information: (req, res) => {
		const { account: { name, company, email } } = res.locals
		if (!email) throw Boom.badData('information not found')

		const response = { name, company, email }
		res.json(response)
	},
	get_plan: (req, res) => {
		const { plan: { name, price }, payments } = res.locals
		const response = {
			name,
			price,
			last_payment: payments ? payments[payments.length - 1].ts : null,
		}
		res.json(response)
	},
	get_ips: async (req, res) => {
		const { account } = res.locals
		const ips = await account.getIps({ attributes: [ 'ip', [ 'ts', 'timestamp' ], 'enabled' ] })
		if (!ips) throw Boom.badData('No IPs at this account.')
		res.json(ips)
	},
	get_plans: async (req, res) => {
		const q = 'SELECT * FROM plans'
		const [ query = null ] = await sequelize.query(q, {
			type: sequelize.QueryTypes.SELECT,
		})
		res.json(query)
	},
	usage: async (req, res) => {
		if (!check_input(req, res)) return 0

		const { account: { id } } = res.locals
		const { tick, range } = req.body
		const data = await get_usage({ tick, range, id })

		return res.status(200).send(data)
	},
	get_extra: async (req, res) => {
		if (!check_input(req, res)) return 0

		const { account: { id } } = res.locals
		const q = 'SELECT show_welcome FROM extra where group_id = :id ;'
		const [ query = null ] = await sequelize.query(q, {
			type: sequelize.QueryTypes.SELECT,
			replacements: { id },
		})
		return res.json(query || { show_welcome: true})
	},
	set_extra: async (req, res) => {
		if (!check_input(req, res)) return 0

		const { account: { id } } = res.locals
		const { show_welcome = null } = req.body

		const q = `
			INSERT INTO extra(show_welcome, group_id) VALUES(:show_welcome, :id) 
			ON DUPLICATE KEY UPDATE show_welcome = VALUES(show_welcome);`
		
		const [ , query = null ] = await sequelize.query(q, {
			type: sequelize.QueryTypes.UPDATE,
			replacements: { id , show_welcome: !!show_welcome},
		})
		return res.json({is_new: query})
	},
}

/**
 * HELPERS
 */

export function check_input(req, res) {
	// validate body params
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.status(422).json({
			errors: errors.mapped(),
		})
		return false
	}
	return true
}

export function buffer2string(value) {
	return Buffer.from(value, 'base64').toString('ascii')
}

/**
 * Calculate the usage in Range by Ticks
 * @param  {...any} info Holds the hours tick and range of days
 * @returns {Promise} Data points
 */
export async function get_usage(info) {
	const { tick, range, id } = info
	const { from = null, to = null } = range
	const isCustomMode = typeof range === 'object'

	if (!isCustomMode) {
		if (typeof range !== 'number') throw Boom.badData('wrong range!')
	}

	if (isCustomMode) {
		if (typeof to !== 'number'
            || typeof from !== 'number'
            || unix(to) < unix(from)) { throw Boom.badData('wrong range!') }
	}

	const [ start, end ] = !isCustomMode
		? [ moment().startOf('hour').subtract(range, 'd').unix(), moment().startOf('hour').unix() ]
		: [ from, to ]

	const q = 'CALL GenerateRangeDates( From_unixtime(:start), From_unixtime(:end), :tick, :id);'
	const q_options = {
		type: sequelize.QueryTypes.RAW,
		replacements: {
			id,
			start,
			end,
			tick,
		},
	}

	const data = await sequelize.query(q, q_options)
	return data
}
