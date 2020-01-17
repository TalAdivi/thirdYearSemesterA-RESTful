import { s_records, sequelize } from '../config/sequelize'
import { StickyIp } from '../models/_index'
import Boom from 'boom'
import { isNumber } from 'lodash'
import { join, resolve } from 'path'
import fs from 'fs'
import validator from 'validator'
import _ from 'lodash'
import logger from '../config/logger'

export default {
	ip_list: async (req, res) => {
		const { dau = false, min_count = null } = req.query
		let { country = null, city = null } = req.query

		if (min_count && !isNumber(Number(min_count))) throw Boom.badData('Please check your input and try again.')
		if (country) country = escape(country)
		if (city) city = escape(city)

		const q = (dau)
			? `
                SELECT COUNT(*) AS counter, ctr, country_name, ${city ? 'city,' : ''} r.country_port port FROM daily_active_ips 
                LEFT JOIN countries AS r ON ctr = r.country_code 
                WHERE day = CURRENT_DATE -1 
                ${country ? `AND ctr = '${country.toUpperCase()}'` : ''} 
                ${(country && city) ? `AND LOWER(city) = '${city.toLowerCase()}'` : ''}   
                GROUP BY ctr ${city ? ', city' : ''}  
                ${min_count ? `HAVING counter >= ${min_count}` : ''}
                ORDER BY counter DESC;
            `
			: `
                SELECT COUNT(*) AS counter, ctr, country_name, ${city ? 'city,' : ''} r.country_port port FROM current_active_ips 
                LEFT JOIN countries AS r ON ctr = r.country_code 
                ${country ? `WHERE ctr = '${country.toUpperCase()}'` : ''} 
                ${(country && city) ? `AND LOWER(city) = '${city.toLowerCase()}'` : ''}   
                GROUP BY ctr ${city ? ', city' : ''}  
                ${min_count ? `HAVING counter >= ${min_count}` : ''}
                ORDER BY counter DESC;
            `

		const query = await s_records.query(q, { type: sequelize.QueryTypes.RAW })

		res.send(query[0])
	},
	cities: async (req, res) => {
		const file = join(resolve('../data'), 'locations.json')
		const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
		res.json(_.remove(data.data, country => country.city_service_available))
	},
	sticky_ip: async (req, res) => {
		const q = `
            SELECT cnt, ctr, name, url, oneMin, tenMin, trdMin, enabled
            FROM (
                SELECT count(*)
                AS cnt, ctr
                FROM records_with_gw_ports
                GROUP BY ctr
            )z JOIN (
                SELECT name, code, url, oneMin, tenMin, trdMin, enabled
                FROM  stickyIps
            )x ON z.ctr = x.code;
        `
		const query = await sequelize.query(q, { type: sequelize.QueryTypes.RAW })
		res.send(query[0])
	},
	update_sticky: async (req, res) => {
		if (!req.body) throw Boom.badData('Empty values!')

		const sticky = req.body
		const query = await StickyIp.upsert(sticky)
			.then(() => StickyIp.findAll({}))
		res.send(query)
	},
	get_stickys: async (req, res) => {
		const q = `SELECT country_name, country_code, 1_minute, 10_minutes, 30_minutes, start_port, end_port 
                    FROM generic_gateway;
                `
		const query = await sequelize.query(q, { type: sequelize.QueryTypes.SELECT })
		res.send(query)
	},
	countries: async (req, res) => {
		const q = 'SELECT * from countries_ports_view;'
		const query = await sequelize.query(q, { type: sequelize.QueryTypes.SELECT })
		const _parsed = query.map(obj => {
			const _tmp = {}
			_tmp.gateway = 'global-s1.geosurf.io'
			_tmp.country_name = obj.country_name
			_tmp.country_code = obj.country_code
			_tmp.ten_minute = JSON.parse(obj.ten_minutes)
			_tmp.one_minute = JSON.parse(obj.one_minutes)
			_tmp.thirty_minute = JSON.parse(obj.thirty_minutes)
			return _tmp
		})
		res.send(_parsed)
	},
	list_all_gw: async (req, res) => {
		const {
			// isp = null,
			city = null,
			state = null,
			// domain = null,
			country: selected_country = null,
			min_count = null,
			dau: isDAU = null,
		} = req.query
		res.set({
			'Content-Type': 'application/json',
			'Content-Length': 5000,
			'Connection': 'keep-alive',
			'Transfer-Encoding': 'chunked',
		})
		logger.debug(req.query)
		const file = join(resolve('../data'), `${isDAU ? 'locations' : 'current_locations'}.json`)
		let data = JSON.parse(fs.readFileSync(file, 'utf-8'))

		if (min_count && validator.isNumeric(min_count)) {
			const _min_count = Number(min_count)
			const _data = {}
			_data.meta = {
				total_ips: 0,
				total_data_points: 0,
				max_data_points: 5000,
			}
			_data.data = _.remove(data.data, country => country.ip_count >= _min_count)
			_data.meta.total_data_points += _data.data.length
			for (const country of _data.data) {
				_data.meta.total_ips += country.ip_count
				if (country.state_service_available) {
					country.states = _.remove(country.states, state => state.ip_count >= _min_count)
					_data.meta.total_data_points += country.states.length
				}
				if (country.city_service_available) {
					country.cities = _.remove(country.cities, city => city.ip_count >= _min_count)
					_data.meta.total_data_points += country.cities.length
				}
			}

			data = _data
		}

		if (selected_country && validator.isAlpha(selected_country)) {
			const _data = {}
			_data.meta = {
				total_ips: 0,
				total_data_points: 0,
				max_data_points: 5000,
			}

			_data.data = _.remove(data.data, country => country.country_code === selected_country.toUpperCase())
			const found_country = _data.data[0]
			_data.meta.total_ips += data.data[0] ? found_country.ip_count : 0
			_data.meta.total_data_points += found_country && found_country.state_service_available ? found_country.states.length : 0
			_data.meta.total_data_points += found_country && found_country.city_service_available ? found_country.cities.length : 0

			return res.json(_data)
		}

		if (state) {
			const temp = state.toUpperCase()
			const response = {
				meta: {
					total_ips: 0,
					total_data_points: 0,
					max_data_points: 5000,
				},
				data: [],
			}
			for (const country of data.data) {
				if (country.state_service_available) {
					for (const state of country.states) {
						if (state.state_code === temp) {
							response.meta.total_ips += state.ip_count
							response.data.push(state)
						}
					}
				}
			}
			response.meta.total_data_points = response.data.length
			return res.json(response)
		}

		if (city) {
			const temp = city.toLowerCase()
			const response = {
				meta: {
					total_ips: 0,
					total_data_points: 0,
					max_data_points: 5000,
				},
				data: [],
			}
			for (const country of data.data) {
				if (country.city_service_available) {
					for (const city of country.cities) {
						if (city.city_name.toLowerCase() === temp) {
							response.meta.total_ips += city.ip_count
							response.data.push(city)
						}
					}
				}
			}
			response.meta.total_data_points = response.data.length
			return res.json(response)
		}
		return res.json(data)
	},
}
