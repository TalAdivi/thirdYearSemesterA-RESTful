import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'
import Plan from './plan'
import Order from './order'
import Payment from './payment'
import Balance from './balance'
import Ip from './ip'
import Log_c from './log_cost'
import Log from './log'

const Account = sequelize.define('groups', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	ref: Sequelize.STRING,
	idev_id: Sequelize.INTEGER,
	gclid: Sequelize.STRING(128),
	is_active: Sequelize.BOOLEAN,
	tCreated: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	company: Sequelize.STRING,
	tax: {
		type: Sequelize.FLOAT,
		defaultValue: 0,
	},
	agent: {
		type: Sequelize.STRING,
		defaultValue: 'WEB',
	},
	account_owner: {
		type: Sequelize.STRING,
		defaultValue: 'WEB',
	},
	upoid: {
		type: Sequelize.INTEGER,
		allowNull: true,
		unique: true, 
	},
	client_request_id: {
		type: Sequelize.DataTypes.UUID,
		unique: true,
		allowNull: true, 
		defaultValue: Sequelize.UUIDV1,
	},
	sf_account_id: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
}, {
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	engine: 'MYISAM',
})

Account.hasOne(Plan, {
	as: 'plan',
	foreignKey: 'group_id',
	targetKey: 'id',
})
Account.hasMany(Payment, {
	as: 'payments',
	foreignKey: 'group_id',
	targetKey: 'id',
})
Account.hasMany(Ip, {
	as: 'ips',
	foreignKey: 'group_id',
	targetKey: 'id',
})
Account.hasOne(Order, {
	as: 'orders',
	foreignKey: 'email',
	targetKey: 'email',
})
Account.hasOne(Balance, {
	as: 'current_balance',
	foreignKey: 'group_id',
	targetKey: 'id',
})
Account.hasMany(Log_c, {
	as: 'log_c',
	foreignKey: 'group_id',
	targetKey: 'id',
})
Account.hasMany(Log, {
	as: 'log',
	foreignKey: 'group_id',
	targetKey: 'id',
})

Payment.belongsTo(Account, { foreignKey: 'group_id', targetKey: 'id', as: 'account' })
Balance.belongsTo(Account, { foreignKey: 'group_id', targetKey: 'id', as: 'current_balance' })
Ip.belongsTo(Account, { foreignKey: 'group_id', targetKey: 'id', as: 'ips' })
Log_c.belongsTo(Account, { foreignKey: 'group_id', targetKey: 'id', as: 'log_c' })
Log.belongsTo(Account, { foreignKey: 'group_id', targetKey: 'id', as: 'log' })

Account.sync({})

export default Account
