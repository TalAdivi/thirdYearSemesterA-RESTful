import {
	header, body, param,
} from 'express-validator/check'
import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import cors from 'cors'
import admin, { authenticate, corsOptions } from '../controllers/util'
import { accounts } from '../controllers/_index'


const router = new Router()
const admin_router = new Router()

router.post('/accounts/login', [
	header('authorization').exists(),
	header('authorization').isLength({ min: 5 }),
	header('authorization').contains('Basic'),
],
asyncHandler(accounts.login))

router.get('/accounts/group_info',
	asyncHandler(accounts.group_info))

router.get('/accounts/info?',
	cors(corsOptions),
	asyncHandler(accounts.info))


/**
 * @description New Routes Customer and New Dashboard
 * @param {Express.Request} req
 * @return {Express.Response}
 */

// !check Authorization header
router.post('/accounts/check_email',
	[ body('email').exists().isEmail() ],
	asyncHandler(accounts.check_email))

router.post('/accounts/change_password',
	[ body('new_password').exists() ],
	asyncHandler(authenticate),
	asyncHandler(accounts.change_password))

router.get('/accounts/reset_password/:token',
	[ param('token').exists() ],
	asyncHandler(accounts.reset_password))

router.get('/accounts/balance',
	asyncHandler(authenticate),
	asyncHandler(accounts.balance))

router.get('/accounts/payments',
	asyncHandler(authenticate),
	asyncHandler(accounts.payments))

router.post('/accounts/usage', [
	body('range').exists().not().isEmpty(),
	body('tick').exists().not().isEmpty()
		.isNumeric(),
],
asyncHandler(authenticate),
asyncHandler(accounts.usage))

router.get('/accounts/ips',
	asyncHandler(authenticate),
	asyncHandler(accounts.get_ips))

router.get('/accounts/plans',
	asyncHandler(authenticate),
	asyncHandler(accounts.get_plans))

router.get('/accounts/account_information?',
	asyncHandler(authenticate),
	asyncHandler(accounts.info))

router.all([ '/accounts/ips/:op',
	'/accounts/ips/:op/:email/:pass' ],
asyncHandler(authenticate),
asyncHandler(accounts.update_ips))

router.get('/accounts/extra',
	asyncHandler(authenticate),
	asyncHandler(accounts.get_extra))

router.post('/accounts/extra', [
	body().not().isEmpty(), 
	body('show_welcome').exists().isBoolean()],
asyncHandler(authenticate),
asyncHandler(accounts.set_extra))

// Admin
admin_router.get('/login',
	asyncHandler(admin.admin_login))

admin_router.post('/getToken',
	asyncHandler(admin.get_token))

admin_router.get('/billing',
	asyncHandler(admin.verify_token),
	asyncHandler(accounts.billing))

admin_router.get('/manage',
	asyncHandler(admin.verify_token),
	asyncHandler(accounts.manage_account))

admin_router.get('/ips/remove_all/:id',
	asyncHandler(admin.verify_token),
	asyncHandler(accounts.remove_all_ips))

admin_router.get('/update_blacklist?',
	asyncHandler(admin.verify_token),
	asyncHandler(accounts.update_blacklist))

router.use('/accounts/admin', admin_router)

export default router
