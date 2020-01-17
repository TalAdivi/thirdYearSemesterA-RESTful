import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const Log_c = sequelize.define('group_logs_cost', {
	/**
     *  `group_logs_cost` AS (select `a`.`plan_id` AS `plan_id`,`a`.`ts` AS `ts`,`a`.`group_id` AS `group_id`,`a`.`up_bytes` AS `sum_ub`,`a`.`down_bytes` AS `sum_db`,if((`a`.`plan_id` = 1),min(`b`.`price_plan_1`),min(`b`.`price_plan_2`)) AS `mp`,(((`a`.`up_bytes` + `a`.`down_bytes`) / 1073741824) * if((`a`.`plan_id` = 1),min(`b`.`price_plan_1`),min(`b`.`price_plan_2`))) AS `cost` from (`group_logs` `a` join `group_payments` `b` on(((`a`.`ts` >= `b`.`ts`) and (`a`.`group_id` = `b`.`group_id`) and (`b`.`state` = 'completed')))) group by `a`.`ts`,`a`.`group_id`,`a`.`plan_id` order by `a`.`group_id`);
     *  */
	group_id: {
		type: Sequelize.INTEGER.UNSIGNED,
		primaryKey: true,
	},
	plan_id: Sequelize.INTEGER,
	ts: Sequelize.DATE,
	sum_ub: Sequelize.DECIMAL,
	sum_db: Sequelize.DECIMAL,
	mp: Sequelize.INTEGER,
	cost: Sequelize.DECIMAL,
}, {
	timestamps: false,
	freezeTableName: true,
})

Log_c.sync({})

export default Log_c
