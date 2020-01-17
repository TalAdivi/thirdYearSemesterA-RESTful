import { Router } from 'express'
import cors from 'cors'
import asyncHandler from 'express-async-handler'
import admin, { authenticate, corsOptions } from '../controllers/util'
import { locations } from '../controllers/_index'

const router = new Router()

/* in use by old Dashboard */
router.get('/locations/city_ips?',
cors(corsOptions), asyncHandler(locations.cities))

/* in use by old Dashboard */
router.get('/locations/get_stickys',
cors(corsOptions), asyncHandler(locations.get_stickys))

/* in use by old Dashboard + Yossi (Kibana) */
router.get('/locations/ip_list?',
	cors(corsOptions), asyncHandler(locations.ip_list))
	
router.get([ '/locations/ip_list?',
	'/locations/ip_list/:email/:pass?' ],
asyncHandler(authenticate), asyncHandler(locations.ip_list))

router.get([ '/locations/new?',
	'/locations/new/:email/:pass?' ],
asyncHandler(authenticate), asyncHandler(locations.list_all_gw))

router.get([ '/locations/city_ips', '/locations/city_ips/:email/:pass' ],
	asyncHandler(authenticate), asyncHandler(locations.cities))


/**************
 * DEPRECATED *
  **************/

/* in use by old Dashboard */
router.get('/locations/global_sticky_ips',
	cors(corsOptions), asyncHandler(locations.countries))

/* in use by old Dashboard */
router.get('/locations/dashboard',
	cors(corsOptions), asyncHandler(locations.list_all_gw))

router.get([ '/locations/sticky_ip',
	'/locations/sticky_ip/:email/:pass' ],
asyncHandler(authenticate), asyncHandler(locations.sticky_ip))

router.get([ '/locations/global_sticky_ips',
	'/locations/global_sticky_ips/:email/:pass' ],
asyncHandler(authenticate), asyncHandler(locations.countries))

router.post([ '/locations/update_sticky/',
	'/locations/update_sticky/:username/:pass' ],
asyncHandler(admin.verify_token), asyncHandler(locations.update_sticky))

export default router
