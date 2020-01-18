import asyncHandler from 'express-async-handler'
import { Router } from 'express'
import { info } from '../controllers/_index'
import util, { authenticate } from '../controllers/util'

const router = new Router()

router.get([ '/info/balance',
	'/info/balance/:email/:pass' ],
asyncHandler(authenticate), asyncHandler(info.balance))

router.get([ '/info/payments',
	'/info/payments/:email/:pass' ],
asyncHandler(authenticate), asyncHandler(info.payments))

/* MOVED TO ELK-MICROSERVICE */
router.get([ '/info/bw_calc/report/:start_date/:end_date/:metric?',
	'/info/bw_calc/report/:start_date/:end_date/:metric/:email/:pass?' ],
/* asyncHandler(authenticate), */ asyncHandler(util.unavailable))


router.get([ '/info/bw_calc/:start_date/:end_date/:metric',
	'/info/bw_calc/:start_date/:end_date/:metric/:email/:pass' ],
asyncHandler(authenticate), asyncHandler(info.bw_calc))

router.get([ '/info/proxy_tracking/daily?',
	'/info/proxy_tracking/daily/:email/:pass?' ],
asyncHandler(authenticate), asyncHandler(info.daily_proxy_tracking))

router.get([ '/info/proxy_tracking/statistics?',
	'/info/proxy_tracking/statistics/:email/:pass?' ],
asyncHandler(authenticate), asyncHandler(info.daily_proxy_trackingv2))

router.get([ '/info/proxy_tracking/:country/:version?',
	'/info/proxy_tracking/:country/:version/:email/:pass?' ],
asyncHandler(authenticate), asyncHandler(info.proxy_tracking))

export default router
