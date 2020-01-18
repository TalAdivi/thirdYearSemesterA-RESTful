import { resolve } from 'path'
import nodemailer from 'nodemailer'
import Email from 'email-templates'
import chalk from 'chalk'
import hbs from 'hbs'
import _ from 'lodash'
import CONFIG from '../config/general'
import logger from '../config/logger'

const {
	smtpConfig, IS_PRODUCTION,
} = CONFIG

class Mailbot {
	static get transport() {
		return nodemailer.createTransport(smtpConfig)
	}

	get mailer() {
		return this.email
	}

	constructor() {
		this.transporter = nodemailer.createTransport(smtpConfig)
		this.hbs = hbs.create()
		this.state = {}
		this.config = {
			transport: this.transporter,
			views: {
				options: {
					extension: 'hbs',
					map: {
						hbs: 'handlebars',
					},
				},
				root: resolve('src', 'mailer', 'templates'),
			},
			message: {
				from: '"Geosurf Residential" <team@geosurf.com>',
			},
			juice: true,
			send: true, // config
			preview: false, // config
			juiceResources: {
				preserveImportant: true,
				webResources: {
					relativeTo: resolve('src', 'mailer', 'styles'),
					images: true,
				},
			},
		}
		return this
	}

	async init() {
		return new Promise((res, rej) => {
			return this.hbs.registerPartials(resolve('src', 'mailer', 'partials'),
				() => {
					if (_.isEmpty(this.hbs.handlebars.partials)) rej(Error('Empty partials src'))
					res(true)
				})
		}).then(() => {
			this.email = new Email(this.config)
			this.email.config.views.options.engineSource.requires.handlebars = this.hbs
			return this
		}).catch((e) => { throw e })
	}

	sendEmail(message = {}) {
		if (_.isEmpty(message)) throw Error('Missing parameters in message')
		if (!IS_PRODUCTION) {
			message.message.to = CONFIG.mail_list.client
		}

		const {
			message: {
				to: email = null,
				subject = 'Welcome to Geosurf',
			},
			template = null,
		} = message

		logger.info(chalk.bgBlueBright(chalk.whiteBright(
			`${this.constructor.name}: sending ${template} email to ${email}, ${subject}`,
		)))
		this.email
			.send(message)
			.catch((e) => { throw e })
	}
}

export default new Mailbot().init()


/* // Solution with Redis
import {
    resolve
} from 'path'
import {
    promisify
} from 'util'
import nodemailer from 'nodemailer'
import Email from 'email-templates'
import chalk from 'chalk'
import Redis from 'redis'
import hbs from 'hbs'
import fs from 'fs'
import _ from 'lodash'
import CONFIG from '../config/general'

const {
    smtpConfig,
    IS_PRODUCTION,
} = CONFIG

class Mailbot {
    static get transport() {
        return nodemailer.createTransport(smtpConfig)
    }

    static get Redis() {
        return Redis
    }

    get redisClient() {
        return this.redis
    }

    get mailer() {
        return this.email
    }

    constructor() {
        this.transporter = nodemailer.createTransport(smtpConfig)
        this.redis = Redis.createClient()
        this.hbs = hbs.create()
        this.state = {}
        this.config = {
            transport: this.transporter,
            views: {
                options: {
                    extension: 'hbs',
                    map: {
                        hbs: 'handlebars',
                    },
                },
                root: resolve('src', 'mailer', 'templates'),
            },
            message: {
                from: '"Geosurf Residential" <team@geosurf.com>',
            },
            juice: true,
            send: true, // config
            preview: false, // config
            juiceResources: {
                preserveImportant: true,
                webResources: {
                    relativeTo: resolve('src', 'mailer', 'styles'),
                    images: true,
                },
            },
        }

        this.redis.on('connect',
            () => logger.info(chalk.bgBlue(' --- Connected to redis --- ')))

        this.redis.on('error',
            err => console.error(chalk.bgBlue(`--- Error while Connected to redis ${err}--- `)))
        return this
    }

    async init() {
        const loadTemplates = promisify(fs.readdir)
        const registerPartials = new Promise((res, rej) => {
            return this.hbs.registerPartials(resolve('src', 'mailer', 'partials'),
                () => {
                    if (_.isEmpty(this.hbs.handlebars.partials)) rej(Error('Empty partials src'))
                    res(true)
                })
        })

        const asyncJobs = [
            registerPartials,
            loadTemplates(resolve('src', 'mailer', 'templates')),
        ]

        return Promise.all(asyncJobs)
            .then((values) => {
                const [, files] = values
                for (const file of files) this.state[file] = []

                this.email = new Email(this.config)
                this.email.config.views.options.engineSource.requires.handlebars = this.hbs
                return this
            }).catch((e) => {
                throw e
            })
    }

    get_State() {
        return this.state
    }

    sendEmail(message = {}) {
        if (_.isEmpty(message)) throw Error('Missing parameters in message')
        if (!IS_PRODUCTION) {
            message.message.to = CONFIG.mail_list.client
        }

        const {
            message: {
                to: email = null,
                subject = 'Welcome to Geosurf',
            },
            template = null,
        } = message

        console.info(chalk.bgBlueBright(chalk.whiteBright(
            `${this.constructor.name}: sending ${template} email to ${email}, ${subject}`,
        )))
        this.email
            .send(message)
            .then(() => {
                this.state[template].push({
                    [email]: +new Date()
                })
                this.redis.hmset(`${template} sent`, {
                    [email]: new Date()
                })
            })
            .catch((e) => {
                throw e
            })
    }
}

export default new Mailbot().init()


*/
