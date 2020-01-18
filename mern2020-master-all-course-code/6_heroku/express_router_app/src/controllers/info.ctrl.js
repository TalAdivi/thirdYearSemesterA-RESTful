import moment from 'moment'
import Boom from 'boom'
import { words, groupBy, isEmpty } from 'lodash'
import json2csv from 'json2csv'
import { Account, Weekly_Record_v } from '../models/_index'
import { calc_bytes } from './util'
import { s_records } from '../config/sequelize'
import ipinfo from './modules/ipinfo.mdl'
import logger from '../config/logger'

const { sequelize } = Account

const to_metric = (obj, metric, clean_mode = 0) => {
	if (clean_mode) {
		return Number(metric === 'MB'
			? (((obj) / 1024) / 1024).toFixed(3)
			: (((obj) / 1024) / 1024 / 1024).toFixed(3))
	}
	return metric === 'MB'
		? `${(((obj) / 1024) / 1024).toFixed(3)} ${metric}`
		: `${(((obj) / 1024) / 1024 / 1024).toFixed(3)} ${metric}`
}

const parse_total = (arr, _metric) => {
	if (_metric === 'GB' || _metric === 'MB') {
		return arr.map((obj) => {
			return {
				upload: to_metric(obj.dataValues.upload, _metric),
				download: to_metric(obj.dataValues.download, _metric),
				date: moment.utc(obj.dataValues.date).format('MMM YYYY'),
			}
		})
	}

	return arr.map((obj) => {
		return {
			upload: calc_bytes(obj.dataValues.upload, 3),
			download: calc_bytes(obj.dataValues.download, 3),
			date: moment.utc(obj.dataValues.date).format('MMM YYYY'),
		}
	})
}

// Router functions:
export default {
	balance: async (req, res) => {
		logger.debug('req.params: %o', req.params)
		const { account } = res.locals
		const {
			id,
		} = account
		const {
			cost: consumed,
			balance,
		} = account.current_balance

		const result = {
			id,
			balance: {
				consumed,
				balance,
			},
		}
		res.send(result)
	},

	payments: async (req, res) => {
		logger.debug('req.params: %o', req.params)
		const { account } = res.locals

		const query = await account.getPayments({
			attributes: [
				'payment_id',
				'last_balance', [ 'charged_amount', 'paid' ],
				[ 'price_plan_1', 'price' ],
				[ sequelize.fn('DATE_FORMAT', sequelize.literal('ts'), '%M %Y'), 'month' ],
			],
		})

		res.send(query)
	},

	bw_calc: async (req, res) => {
		logger.info('* bw_calc *')
		logger.debug('req.params: %o', req.params)

		const { account } = res.locals
		const ACCEPT_FORMAT = 'MM-YY'
		const {
			start_date,
			end_date,
			metric,
		} = req.params
		const _metric = metric.toUpperCase()

		if (!moment(start_date, ACCEPT_FORMAT, true).isValid() || !moment(end_date, ACCEPT_FORMAT, true).isValid()) {
			throw Boom.conflict('Please use the correct date format MM-YY')
		}
		const start = moment.utc(start_date, ACCEPT_FORMAT).valueOf()
		const end = moment.utc(end_date, ACCEPT_FORMAT).endOf('month').valueOf()
		logger.debug(`from: ${start}`)
		logger.debug(`to: ${end}`)

		const usage = await account.getLog_c({
			where: {
				ts: {
					$gte: start,
					$lte: end,
				},
			},
			attributes: [
				[ 'sum_db', 'upload' ],
				[ 'sum_ub', 'download' ],
				[ 'ts', 'date' ],
			],
			group: sequelize.fn('MONTH', sequelize.col('ts')),
		})
		res.set({
			'Content-Type': 'application/json',
			'Content-Length': 5000,
			Connection: 'keep-alive',
			'Transfer-Encoding': 'chunked',
		})

		switch (_metric) {
		case 'MB':
		{
			const total = parse_total(usage, 'MB')
			res.send(total)
			break
		}
		case 'GB':
		{
			const total = parse_total(usage, 'GB')
			res.send(total)
			break
		}
		default:
		{
			throw Boom.forbidden('Operation not allowed: please choose traffic metric GB or MB ')
		}
		}
	},

	proxy_tracking: async (req, res) => {
		logger.info('* proxy_tracking *')
		const {
			from = null, to = null,
		} = req.query
		const {
			country: iso = '*',
			version = '*',
		} = req.params

		const ACCEPT_FORMAT = 'YYYY-MM-DD'
		const q = {
			where: {},
			attributes: [ 'ts', 'iso', 'country', 'version', 'registered', [ sequelize.cast(sequelize.col('machines_active'), 'integer'), 'num_active' ] ],
		}

		if (from) {
			if (!moment(from, ACCEPT_FORMAT, true).isValid()) {
				throw Boom.conflict('Please use the correct date format YYYY-MM-DD')
			}
		}

		if (to) {
			if (!moment(to, ACCEPT_FORMAT, true).isValid()) {
				throw Boom.conflict('Please use the correct date format YYYY-MM-DD')
			}
		}

		if (from) {
			if (to) q.where.ts = { $gte: from, $lte: to }
			else q.where.ts = { $gte: from }
		} else if (to) q.where.ts = { $lte: to }

		if (iso !== '*') {
			const countries = words(iso.toUpperCase())
			q.where.iso = {
				$in: countries,
			}
		}
		if (version !== '*') q.where.version = { $like: `%${version}%` }

		const result = await Weekly_Record_v.findAll(q)
		const _result = groupBy(result, 'iso')
		res.send(_result)
	},
	daily_proxy_tracking: async (req, res) => {
		logger.info('* daily_proxy_tracking *')
		const {
			country = null,
			from: _from = null,
			to: _to = null,
			date = null,
			csv = false,
		} = req.query
		const ACCEPT_FORMAT = 'YYYY-MM-DD'

		if ((_from || _to) && date) throw Boom.badData('Please select either date range or specific date!')
		if (
			(_from && !moment(_from, ACCEPT_FORMAT, true).isValid())
            || (_to && !moment(_to, ACCEPT_FORMAT, true).isValid())
            || (date && !moment(date, ACCEPT_FORMAT, true).isValid())
		) throw Boom.conflict('Please use the correct date format YYYY-MM-DD')

		const q = `
                SELECT count(DISTINCT real_ip) counter, ctr country , day date FROM daily_active_ips 
                WHERE ${country ? `ctr = '${country.toUpperCase()}' AND` : ''} 
                ${_from ? `day >= '${_from}' ${_to ? 'AND' : ''}` : ''} 
                ${_to ? `day <= '${_to}'` : ''} 
                ${date ? `day = '${date}'` : (_to || _from) ? '' : 'day = CURRENT_DATE'} GROUP BY country ${_to || _from || date ? ', day' : ''};
            `
		logger.debug('%o',q)
		const result = await s_records.query(q, {
			type: sequelize.QueryTypes.SELECT,
		})

		if (csv) {
			const fields = [ 'counter', 'country', 'date' ]
			const opts = {
				fields,
			}
			try {
				const csv_file = json2csv.parse(result, opts)
				return res
					.set('Content-Type', 'text/csv')
					.send(csv_file)
			} catch (err) {
				throw (err)
			}
		}
		const _result = !country ? groupBy(result, 'country') : result
		return res.send(_result)
	},
	daily_proxy_trackingv2: async (req, res) => {
		logger.info('* daily_proxy_tracking_v2 *')
		const {
			from: _from = null,
			to: _to = null,
		} = req.query
		const ACCEPT_FORMAT = 'YYYY-MM-DD'
		if (
			(_from && !moment(_from, ACCEPT_FORMAT, true).isValid())
            || (_to && !moment(_to, ACCEPT_FORMAT, true).isValid())
		) throw Boom.conflict('Please use the correct date format YYYY-MM-DD')

		const q = `
        SELECT DAU,
            Concurrent_Min,
            Concurrent_Max,
            Concurrent_Avg,
            a.ctr Country,
            a.day Date
        FROM   (SELECT Date(hr)        day,
                    ctr,
                    Min(ips)        Concurrent_Min,
                    Max(ips)        Concurrent_Max,
                    Floor(Avg(ips)) Concurrent_avg
                FROM   current_active_ips_snapshot
                WHERE  ctr != '' AND
                ${_from ? `hr >= '${_from}' ${_to ? 'AND' : ''}` : ''} ${_to ? `hr <= '${_to}'` : ''} ${_to || _from ? '' : 'hr = CURRENT_DATE'}
                GROUP  BY 1,2
            ) a
            JOIN (SELECT day,
                            ctr,
                            Count(DISTINCT real_ip) DAU
                    FROM   daily_active_ips
                    WHERE  ctr != '' AND
                ${_from ? `day >= '${_from}' ${_to ? 'AND' : ''}` : ''} ${_to ? `day <= '${_to}'` : ''} ${_to || _from ? '' : 'day = CURRENT_DATE'}
                    GROUP  BY day,
                            ctr) b
                ON a.day = b.day
                    AND a.ctr = b.ctr;
        `
		const result = await s_records.query(q, {
			type: sequelize.QueryTypes.SELECT,
		})
		const element = []
		for (const object of result) {
			let i = 0
			for (const key in object) {
				if (!key) return 0
				element.push({
					Country: object.Country,
					Date: object.Date,
					Measurement: key,
					Count: object[key],
				})
				i++
				if (i === 4) break
			}
		}
		// res.send(result)
		const fields = [ 'Country', 'Date', 'Measurement', 'Count' ]

		const opts = {
			fields,
		}
		if (isEmpty(result)) throw Boom.badData('No data for selected dates')
		try {
			const csv_file = json2csv.parse(element, opts)
			return res
				.set('Content-Type', 'text/csv')
				.send(csv_file)
		} catch (err) {
			throw (err)
		}
	},
	// bw_calc_reportV2: async (req, res) => {
	// 	logger.info('* bw_calc_v2 *')
	// 	logger.debug('req.body: %o', req.body)
	// 	res.set({
	// 		'Content-Type': 'application/json',
	// 		'Content-Length': 5000,
	// 		Connection: 'keep-alive',
	// 		'Transfer-Encoding': 'chunked',
	// 	})
	// 	const { params } = req
	// 	const {
	// 		aggregated = false, ip = null,
	// 	} = req.query
	// 	const {
	// 		start_date,
	// 		end_date,
	// 		metric = null,
	// 		unit = 'MINUTE',
	// 	} = params
	// 	const { account } = res.locals
	// 	const ACCEPT_FORMAT = 'YYYY-MM-DD HH'
	// 	const _metric = metric.toUpperCase()
	// 	const { id: group_id } = account
	// 	const isValidIP = await ipinfo.validate(ip) || false
	// 	let response = {}

	// 	if (!moment(start_date, ACCEPT_FORMAT, true).isValid() || !moment(end_date, ACCEPT_FORMAT, true).isValid()) {
	// 		throw Boom.conflict('Please use the correct date format YYYY-MM-DD hh')
	// 	}

	// 	const _start = moment.utc(start_date, ACCEPT_FORMAT)
	// 	const _end = moment.utc(end_date, ACCEPT_FORMAT)

	// 	if (moment.utc().add(10, 'm').valueOf() <= _end) {
	// 		throw Boom.conflict(`please set the end date to be at least 10 minutes before ${new Date().toUTCString()}`)
	// 	}
	// 	if (_metric !== 'MB' && _metric !== 'GB') {
	// 		throw Boom.forbidden('Operation not allowed: please choose traffic metric GB or MB ')
	// 	}
	// 	if (req.method === 'GET' && ip && !isValidIP) throw Boom.notAcceptable('Input not valid! Expected: Array[value(s)]OR ips=...')

	// 	if (aggregated) {
	// 		const q = ` SELECT
    //                 CAST(SUM(up_bytes /1024/1024${_metric === 'GB' ? '/1024' : ''}) AS DOUBLE(20,3)) sum_up,
    //                 CAST(SUM(down_bytes  /1024/1024${_metric === 'GB' ? '/1024' : ''}) AS DOUBLE(20,3)) sum_down,
    //                 CAST((SUM(up_bytes) + SUM(down_bytes)) /1024/1024${_metric === 'GB' ? '/1024' : ''} AS DOUBLE(7,3)) sum_total ${ip && isValidIP ? ',client_ip ip' : ''}
    //                 FROM   log_sum_traffic_logs
    //                 WHERE  group_id = ${group_id}  ${ip && isValidIP ? `AND client_ip in('${ip}')` : ''}
    //                 AND ts BETWEEN FROM_UNIXTIME(${_start.unix()}) AND FROM_UNIXTIME(${_end.unix()})
    //                 limit 5000;
    //         `
	// 		const usage = await sequelize.query(q, {
	// 			type: sequelize.QueryTypes.SELECT,
	// 		})

	// 		if (!usage[0]) {
	// 			throw Boom.conflict('No data for the requested timerange.')
	// 		}
	// 		response = {
	// 			start_date,
	// 			end_date,
	// 			metric: _metric,
	// 			bandwidth: usage[0],
	// 		}
	// 	} else {
	// 		const q = `SELECT
    //                 CAST(up_bytes /1024/1024${_metric === 'GB' ? '/1024' : ''} AS DOUBLE(7,3)) upload,
    //                 CAST(down_bytes  /1024/1024${_metric === 'GB' ? '/1024' : ''} AS DOUBLE(7,3)) download,
    //                 CAST((up_bytes + down_bytes) /1024/1024${_metric === 'GB' ? '/1024' : ''} AS DOUBLE(7,3)) total,
    //                 ts timestamp,
    //                 client_ip ip
    //                 FROM   log_sum_traffic_logs
    //                 WHERE  group_id = ${group_id}  ${ip && isValidIP ? `AND client_ip in ('${ip}')` : ''}
    //                 AND ts BETWEEN FROM_UNIXTIME(${_start.unix()}) AND FROM_UNIXTIME(${_end.unix()})
    //                 limit 5000;
    //         `
	// 		const usage = await sequelize.query(q, {
	// 			type: sequelize.QueryTypes.SELECT,
	// 		})

	// 		if (!usage) {
	// 			throw Boom.conflict('No data for the requested timerange.')
	// 		}
	// 		response = {
	// 			meta: {
	// 				from: `${start_date}:00`,
	// 				to: `${end_date}:00`,
	// 				metric: _metric,
	// 				timestamp_delta: `10 ${unit}S`,
	// 				total_rows: usage.length,
	// 				max_rows: 5000,
	// 			},
	// 			data: usage,
	// 		}
	// 	}
	// 	res.json(response)
	// },
}
