import { uniq, uniqBy } from 'lodash'
import validate from 'ip-validator'
import Boom from 'boom'
import logger from '../config/logger'

const Regexp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/

const is_valid_ip = ip => Regexp.test(ip)

const senitize = (ips, id, flag) => {
	logger.info('Clean mode? ', flag)
	try {
		const ip_list = ips.map((ip, i) => {
			logger.info(`Checking ip: ${i}: [${ip}]`)
			if (!is_valid_ip(ip) || !validate.ipv4(ip)) throw Boom.conflict(`IP not valid! ${i}: [${ip}]`)

			if (flag) return ip
			return { ip, group_id: id, enabled: 1 }
		})
		// logger.info(ip_list)
		if (flag) return uniq(ip_list)
		return uniqBy(ip_list, 'ip')
	} catch (err) {
		logger.error('>Error from senitize ip')
		throw err
	}
}

const to_object = (arr, mode, value) => {
	try {
		return arr.map((obj) => {
			const _obj = { ip: obj }
			_obj[mode] = value
			return _obj
		})
	} catch (err) {
		logger.error('>Error from to_object')
		throw err
	}
}
// Module Functions:
export default {
	senitize,
	to_object,
}
