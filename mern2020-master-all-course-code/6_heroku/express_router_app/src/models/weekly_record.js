import Sequelize from 'sequelize'
import { s_records } from '../config/sequelize'
import Record from './record'
const Weekly_Record = s_records.define('weekly_records_history', {

	ts: Sequelize.DATE,
	ctr: Sequelize.STRING,
	version: Sequelize.STRING,
	uuid: Sequelize.STRING,
}, {
	timestamps: false,
	freezeTableName: true,
})

Weekly_Record.sync({})
Weekly_Record.belongsTo(Record, { foreignKey: 'uuid', targetKey: 'uuid', as: 'wRecords' })

export default Weekly_Record
