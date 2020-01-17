export default {
	login: (email, password) => `
    SELECT IF(EXISTS(
            SELECT *
            FROM groups WHERE Lower(email) = '${email}'
            AND password = '${password}'
            AND is_active IS TRUE), 1, 0)
        'success',
        g.id group_id,
        g.email
    FROM groups g
    WHERE g.email = '${email}';
    `,
	_login_info: (email, password) => ` 
        SELECT 
            IF(EXISTS(
                SELECT *
                FROM   groups
                WHERE  lower(email) = '${email}'
                AND    password = '${password}'
                AND    is_active IS TRUE 
                ), 1, 0 ) 'success',
            g.id group_id,
            g.name,
            g.company,
            g.email,
            'N/A' phone,
            'N/A' address,
            'N/A' city,
            'N/A' state,
            'N/A' country,
            'N/A' profile_picture,
            FALSE newsletter,
            FALSE notifications,
            'N/A' subaccounts_count,
            'N/A' requests_count,
            'N/A' serp_used,
            b.balance,
            b.amount,
            b.cost spent,
            p.name plan_name,
            p.plan_amount,
            p.price,
            'N/A' bandwidth,
            'N/A' date_start,
            'N/A' last_payment_date,
            'N/A' next_payment_date
        FROM   groups g
        JOIN   group_balance_view b
        ON     g.id = group_id
        JOIN   group_plan p
        ON     g.id = p.group_id
        WHERE  g.email = '${email}' 
    `,
	construct_data: (query) => {
		return {
			group_id: query.group_id,
			name: query.name,
			company: query.name,
			email: query.email,
			billing: {
				balance: query.balance,
				amount: query.amount,
				spent: query.spent,
				plan: {
					plan_name: query.plan_name,
					plan_amount: query.plan_amount,
					price: query.price,
					bandwidth: query.bandwidth,
					date_start: query.date_start,
					last_payment_date: query.last_payment_date,
					next_payment_date: query.next_payment_date,
				},
			},
			account_info: {
				phone: query.phone,
				address: query.address,
				city: query.city,
				state: query.state,
				country: query.country,
				profilepicture: query.profile_picture,
				newsletter: query.newsletter,
				notifications: query.notifications,
				subaccounts_count: query.subaccounts_count,
				requests_count: query.requests_count,
				serp_used: query.serp_used,
			},
		}
	},
}