import logger from '../config/logger'

export default {
	testp: async (req, res) => {
		logger.info('* Ptest-hook *')
		const logs = req.body
		logger.debug(logs)        
		res.send(logs)
	},
	testg: async (req, res) => {
		logger.info('* Gtest-hook *')
		const logs = req.params
		logger.debug(logs)
		res.send(logs)
	},
	test_post_request: (req, res) => {
		res.send('bye!')
	},
}
