import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'
import Boom from 'boom'
import {
	Account, Payment, Balance, Plan,
} from '../models/_index'
import CONFIG from '../config/general'
import logger from '../config/logger'

const {
	NODE_ENV,
	KEYS: { 0: hash_key },
	HOST: whitelist,
	SSR,
	TOKEN_EXP,
	TOKEN_KEY,
} = CONFIG

const { sequelize } = Account


export const md5 = data => createHash('md5').update(data).digest('hex')

export const hash = pass => md5(pass + hash_key)

export const authenticate = async (req, res, next) => {
	logger.debug('*authenticate*')
	if (req.get('authorization')) {
		/* eslint no-use-before-define: 0 */
		return token_authentication(req, res, next)
	}
	const email = req.query.email || req.params.email || req.body.email
	const pass = req.query.pass || req.params.pass || req.body.pass

	if (!email || !pass) throw Boom.unauthorized('ERROR: USER NOT ALLOWED!')
	const password = hash(pass)
	const query = NODE_ENV === 'LOCAL'
		? { where: { email } }
		: { where: { is_active: 1, email, password } }
	query.include = [
		{ model: Payment, as: 'payments' },
		{ model: Balance, as: 'current_balance' },
		{ model: Plan, as: 'plan' },
	]
	const account = await Account.findOne(query)

	if (!account) throw Boom.unauthorized('Error: unauthorized!')
	res.locals.account = account
	return next()
}

export const calc_bytes = (bytes, precision) => {
	if (bytes === 0) { return '0 bytes' }
	if (Number.isNaN(parseFloat(bytes)) || !Number.isFinite(bytes)) return '-'
	if (typeof precision === 'undefined') precision = 1

	const units = [ 'bytes', 'kB', 'MB', 'GB', 'TB', 'PB' ]
	const number = Math.floor(Math.log(bytes) / Math.log(1024))
	const val = (bytes / (1024 ** Math.floor(number))).toFixed(precision)

	return `${(val.match(/\.0*$/) ? val.substr(0, val.indexOf('.')) : val)} ${units[number]}`
}

export const corsOptions = {
	origin: (origin, callback) => {
		logger.info('origin: ', origin)
		if (NODE_ENV !== 'LOCAL') {
			if (whitelist.indexOf(origin) !== -1) {
				return callback(null, true)
			}
			logger.info('Not allowed by CORS')
			return callback(Boom.illegal('not allowed'), false)
		}
		return callback(null, true)
	},
}
export const unavailable = async (req, res) => {
	res
		.set('Content-Type', 'text/html')
		.status(404)
		.render('error', {
			error: {
				status: 404,
			},
			message: 'TEMPORARY UNAVAILABLE',
			geoPic: '/images/geosurf-logo.png',
		})
}

export default {
	admin_login: async (req, res) => {
		res
			.set('Content-Type', 'text/html')
			.render('login', {
				style: 'login',
				js: 'login',
				root_url: SSR.root_url,
				title: 'Geosurf',
			})
	},

	unavailable: async (req, res) => {
		res.set('Content-Type', 'text/html')
			.status(404)
			.render('error', {
				title: 'Geosurf',
				style: 'error',
				error: {
					status: 404,
				},
				message: 'TEMPORARY UNAVAILABLE',
				geoPic: '/images/geosurf-logo.png',
			})
	},
	get_token: async (req, res) => {
		const { email = null, password = null } = req.body
		if (!email || !password) throw Boom.unauthorized('Missing parameters!')
		const q = ` 
                SELECT EXISTS ( 
                    SELECT * FROM membership_users WHERE email = '${email}' AND passMD5 = '${md5(password)}' 
                ) authorized; 
                `
		const [ query ] = await Account.sequelize.query(q, { type: sequelize.QueryTypes.SELECT })
		const { authorized } = query

		if (authorized) {
			return jwt.sign({ email, password },
				TOKEN_KEY, { expiresIn: TOKEN_EXP },
				(err, token) => {
					if (err) throw err
					return res.json({ token })
				})
		}
		throw Boom.unauthorized('User Not Authorized!')
	},
	verify_token: async (req, res, next) => {
		logger.info('* verify_token *')
		const { authorization: bearerHeader = null } = req.headers
		const { token: queryToken = null } = req.query

		if (bearerHeader !== null) {
			const [ bearer = null, bearerToken = null ] = bearerHeader.split(' ')
			if (bearer && bearerToken) return verify_jwt(bearerToken, req, next)

			throw Boom.unauthorized('Token not authorized')
		}
		if (queryToken !== null) return verify_jwt(queryToken, req, next)
		throw Boom.unauthorized('Token not authorized')
	},
}

/**
 * Helpers
*/

/**
 * verfy JWT and continue to the next middleware
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Application} next
 * @returns Account information
 * @throws {Boom}
 */

export function token_authentication(req, res, next) {
	const { authorization: bearerHeader = null } = req.headers

	if (bearerHeader && bearerHeader.includes('Bearer ')) {
		const { 1: token = null } = bearerHeader.split(' ')
		return jwt.verify(token, TOKEN_KEY, async (err, authData) => {
			if (err) throw Boom.unauthorized(err)

			const { email, group_id } = authData
			const q = {
				where: { /* is_active: 1, */ email, id: group_id }, // User doesnt need to be active to sign in to the dashboard
				include: [
					{ model: Payment, as: 'payments' },
					{ model: Balance, as: 'current_balance' },
					{ model: Plan, as: 'plan' },
				],
			}
			const account = await Account.findOne(q)
			if (!account) throw Boom.unauthorized('Error: unauthorized!')

			res.locals.account = account
			return next()
		})
	}
	throw Boom.unauthorized('Token not authorized')
}

export function verify_jwt(token, req, next) {
	return jwt.verify(token, TOKEN_KEY, (err, authData) => {
		if (err) throw Boom.unauthorized(err)

		req.authData = authData
		return next()
	})
}
