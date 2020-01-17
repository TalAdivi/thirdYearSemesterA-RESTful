import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const Plan = sequelize.define('group_plan', {

	group_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true,
	},
	plan_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false,
	},
	pk: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	product: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
	addons: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
	billing: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
	low_balance_flag: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	plan_amount: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	rebilling: {
		type: Sequelize.BOOLEAN,
		defaultValue: null,
	},
	payment_provider: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
	next_charge: {
		type: Sequelize.DATE,
		defaultValue: null,
	},
}, {
	freezeTableName: true,
	timestamps: false,
})

Plan.sync({})

export default Plan
