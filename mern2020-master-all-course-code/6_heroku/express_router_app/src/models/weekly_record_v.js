import Sequelize from 'sequelize'
import { s_records } from '../config/sequelize'

const Weekly_Record_v = s_records.define('weekly_history_view', {

	ts: Sequelize.DATE,
	iso: Sequelize.STRING,
	country: Sequelize.INTEGER,
	version: Sequelize.STRING,
	machines_active: Sequelize.DECIMAL,
	registered: Sequelize.BIGINT,
}, {
	timestamps: false,
	freezeTableName: true,
})

Weekly_Record_v.sync({})
export default Weekly_Record_v
