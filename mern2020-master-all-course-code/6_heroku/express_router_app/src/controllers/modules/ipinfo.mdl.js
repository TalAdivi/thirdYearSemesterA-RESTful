import Maxmind from 'maxmind'
import path from 'path'
import logger from '../../config/logger'

class Ipinfo {
	constructor() {
		Maxmind.open(path.resolve('data/GeoIP2-Country.mmdb'), (err, maxmindLookup) => {
			if (err) throw (err)
			this.maxmindLookup = maxmindLookup
		})
		this.maxmind = Maxmind
	}
	get Maxmind() {
		return this.maxmind
	}
	get lookup() {
		return this.maxmindLookup
	}
	validate(ip) {
		return this.maxmind.validate(ip)
	}
	test(ip) {
		if (!ip || !this.maxmindLookup.get(ip)) {
			logger.info('bad ip! return null for this ip: ', ip)
			return null
		}
		const info = this.maxmindLookup.get(ip)
		if (!info.country) {
			logger.info('bad ip! return null for this ip: ', ip)
			return null
		}
		return info
	}
	countryCode(ip = null) {
		const info = this.test(ip)
		if (!info) return null

		return info.country.iso_code
	}
	fullInfo(ip = null) {
		const info = this.test(ip)
		if (!info || !info.country) return null
		return {
			ip,
			ip_location: info.country ? info.country.names.en : 'N/A',
			country: info.country ? info.country.iso_code : 'N/A',
		}
	}
}

export default new Ipinfo()
