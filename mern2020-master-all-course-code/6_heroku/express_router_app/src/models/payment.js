import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const Payment = sequelize.define('group_payments', {

	group_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	payment_id: {
		type: Sequelize.STRING(128),
		unique: true,
		defaultValue: null,
	},
	hook_id: {
		type: Sequelize.STRING(128),
		defaultValue: 'UPGRADE/NEW-ORDER',
	},
	state: {
		type: Sequelize.STRING(30),
		defaultValue: 'completed',
	},
	amount: {
		type: Sequelize.DECIMAL(7, 2),
		defaultValue: null,
	},
	plan_amount: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	charged_amount: {
		type: Sequelize.DECIMAL(7, 2),
		defaultValue: 0,
	},
	last_balance: {
		type: Sequelize.DECIMAL(7, 2),
		defaultValue: 0,
	},
	ts: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	trans_id: {
		type: Sequelize.STRING(128),
		defaultValue: null,
	},
	price_per_gb: {
		type: Sequelize.FLOAT,
		defaultValue: 0,
	},
	price_plan_1: {
		type: Sequelize.FLOAT,
		defaultValue: 0,
	},
	price_plan_2: {
		type: Sequelize.FLOAT,
		defaultValue: 0,
	},
	pk: {
		type: Sequelize.INTEGER(9),
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	price_plan_3: {
		type: Sequelize.FLOAT,
		defaultValue: 0,
	},
	doneBy: {
		type: Sequelize.STRING,
		defaultValue: 'GEOBOT',
	},
	sf_succ_opp_id: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	sf_opp_id: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},

}, {
	freezeTableName: true,
	timestamps: false,
	underscored: true,
})

Payment.sync({})

export default Payment
