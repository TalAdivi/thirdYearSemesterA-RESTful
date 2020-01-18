import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const StickyIp = sequelize.define('stickyIp', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	code: {
		type: Sequelize.STRING,
		unique: true,
		primaryKey: true,
		allowNull: false,
	},
	url: Sequelize.STRING,
	oneMin: Sequelize.STRING,
	tenMin: Sequelize.STRING,
	trdMin: Sequelize.STRING,
	enabled: {
		type: Sequelize.BOOLEAN,
		defaultValue: 1,
	},
}, {
	freezeTableName: false,
	timestamps: true,
	underscored: true,
})


StickyIp.sync({})

export default StickyIp
