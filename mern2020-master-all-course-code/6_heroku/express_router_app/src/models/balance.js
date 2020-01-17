import Sequelize from 'sequelize'
import { sequelize } from '../config/sequelize'

const Balance = sequelize.define('group_balance_view', {
	/**
     *  `b`.`group_id` AS `group_id`,ifnull(`a`.`cost`,0) AS `cost`,sum(`b`.`amount`) AS `amount`,(sum(`b`.`amount`) - ifnull(`a`.`cost`,0)) AS `balance`
        FROM (`group_payments` `b` left join `group_balance_subquery` `a` on((`a`.`group_id` = `b`.`group_id`))) where (`b`.`state` = 'completed') group by `b`.`group_id`;
     */
	group_id: {
		type: Sequelize.INTEGER.UNSIGNED,
		primaryKey: true,
	},
	cost: Sequelize.DECIMAL,
	amount: Sequelize.DECIMAL,
	balance: Sequelize.DECIMAL,
}, {
	timestamps: false,
	freezeTableName: true,
})

Balance.sync({})

export default Balance
