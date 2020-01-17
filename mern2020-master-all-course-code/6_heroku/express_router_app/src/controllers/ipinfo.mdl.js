import maxmind from 'maxmind'
import Boom from 'boom'
import path from 'path'
import logger from '../config/logger'

class Ipinfo {
	constructor() {
		maxmind.open(path.resolve('data/GeoIP2-Country.mmdb'), (err, maxmindLookup) => {
			if (err) throw (err)
			this.maxmindLookup = maxmindLookup
		})
	}

	get lookup() {
		return this.maxmindLookup
	}

	countryCode(ip = null) {
		if (!ip) throw Boom.notFound('Unable to locate IP!')
		if (!this.maxmindLookup.get(ip)) {
			logger.info('bad ip! return null for this ip: ', ip)
			return null
		}
		const info = this.maxmindLookup.get(ip)
		if (!info.country) {
			logger.info('bad ip! return null for this ip: ', ip)
			return null
		}
		return info.country.iso_code
	}
}

export default new Ipinfo()
