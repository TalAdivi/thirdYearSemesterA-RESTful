import cluster from 'cluster'
import { cpus } from 'os'
import server from './src/server'
import config from './src/config/general'
import logger from './src/config/logger'
import http from 'http'

let service
const { IS_LOCAL, SERVICE_PORT } = config

if (cluster.isMaster && !IS_LOCAL) {
	logger.info(`Master ${process.pid} id running`)
	// Fork workers.
	let i = 1
	for (const cpu of cpus()) {
		if (i <= 4) {
			logger.info('%o', cpu.speed)
			cluster.fork()
		}
	}

	cluster.on('exit', (worker) => {
		logger.info(`worker ${worker.process.pid} died`)
	})

} else {
	service = http.createServer(server)

	// SuperTest (restart server fix)
	!module.parent && service.listen(SERVICE_PORT,
		logger.info('Express server listening on port ' + SERVICE_PORT))
}

export default service
