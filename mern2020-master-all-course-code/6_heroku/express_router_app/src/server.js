import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import Boom from 'boom'
import path from 'path'
import lessMiddleware from 'less-middleware'
import favicon from 'serve-favicon'
import CONFIG from './config/general'
import logger from './config/logger'
import swaggerUi from 'swagger-ui-express'
const swaggerDocument = require('./swagger.json')

import {
	Accounts_router,
	Locations_router,
	Info_router,
} from './routes/_index'


const app = express()
const { REQ_LOG, IS_LOCAL, IS_PRODUCTION } = CONFIG

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
	next()
})

// view engine setup

app.use(lessMiddleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.set('Content-Type', 'application/json')
app.set('json spaces', 4)

app.use(favicon(path.join(__dirname,
	'public',
	'images',
	'favicon.ico')))

app.get('/ping', (req, res) => res.status(200).send('OK'))

app.use([
	bodyParser.json(),
	bodyParser.urlencoded({ extended: true }),
	cors({ origin: true }),
])

if (REQ_LOG) {
	(IS_LOCAL || IS_PRODUCTION)
		? app.use(morgan('dev'))
		: app.use(morgan('combined', { stream: logger.stream }))
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use([
	Accounts_router,
	Locations_router,
	Info_router,
])
app.use((err, req, res, next) => {
	logger.info('*ErrHandler*')
	logger.info(err.message)
	logger.debug(err.stack)
	if (Boom.isBoom(err)) return res.status(err.output.statusCode).json(err.output.payload)
	if (err.name.includes('Sequelize')) return res.status(400).json(err)

	const error = Boom.boomify(err)
	return res.status(error.output.statusCode).json(error.output.payload)
})

export default app
