const budgets = [
	{
		'id': 1,
		'name': 'Rent',
		'amount': 1500.0,
		'status': 'Active',
		'category': 'Housing',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-01-01',
		'end_date': '2023-12-31',
		'notes': 'Monthly rent for apartment',
	},
	{
		'id': 2,
		'name': 'Groceries',
		'amount': 300.0,
		'status': 'Active',
		'category': 'Food',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-09-01',
		'end_date': '2023-09-30',
		'notes': 'Monthly grocery budget',
	},
	{
		'id': 3,
		'name': 'Vacation',
		'amount': 2000.0,
		'status': 'Planned',
		'category': 'Travel',
		'start_date': '2023-11-15',
		'end_date': '2023-11-30',
		'notes': 'Winter vacation planning',
	},
	{
		'id': 4,
		'name': 'Emergency Fund',
		'amount': 5000.0,
		'status': 'Active',
		'category': 'Savings',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-01-01',
		'end_date': 'none',
		'notes': 'Savings for unexpected expenses',
	},
	{
		'id': 5,
		'name': 'Utilities',
		'amount': 400.0,
		'status': 'Active',
		'category': 'Bills',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-09-01',
		'end_date': '2023-09-30',
		'notes': 'Monthly utility bills',
	},
	{
		'id': 6,
		'name': 'Car Maintenance',
		'amount': 100.0,
		'status': 'Active',
		'category': 'Transportation',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-09-01',
		'end_date': '2023-09-30',
		'notes': 'Monthly car maintenance budget',
	},
	{
		'id': 7,
		'name': 'Entertainment',
		'amount': 200.0,
		'status': 'Active',
		'category': 'Entertainment',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-09-01',
		'end_date': '2023-09-30',
		'notes': 'Monthly entertainment budget',
	},
	{
		'id': 8,
		'name': 'Healthcare',
		'amount': 150.0,
		'status': 'Active',
		'category': 'Health',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-09-01',
		'end_date': '2023-09-30',
		'notes': 'Monthly healthcare expenses',
	},
	{
		'id': 9,
		'name': 'Education',
		'amount': 300.0,
		'status': 'Active',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'category': 'Education',
		'start_date': '2023-09-01',
		'end_date': '2023-09-30',
		'notes': 'Monthly education expenses',
	},
	{
		'id': 10,
		'name': 'Vacation 2',
		'amount': 2500.0,
		'status': 'Planned',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'category': 'Travel',
		'start_date': '2023-12-01',
		'end_date': '2023-12-15',
		'notes': 'Summer vacation planning',
	},
	{
		'id': 11,
		'name': 'Clothing',
		'amount': 200.0,
		'status': 'Active',
		'category': 'Shopping',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-09-01',
		'end_date': '2023-09-30',
		'notes': 'Monthly clothing budget',
	},
	{
		'id': 12,
		'name': 'Emergency Fund 2',
		'amount': 7000.0,
		'status': 'Active',
		'category': 'Savings',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-01-01',
		'end_date': 'none',
		'notes': 'Savings for unexpected expenses',
	},
	{
		'id': 13,
		'name': 'Home Improvement',
		'amount': 500.0,
		'status': 'Planned',
		'category': 'Housing',
		'allow_overspending': false,
		'frequency': 'Monthly',
		'start_date': '2023-10-01',
		'end_date': '2023-12-31',
		'notes': 'Renovation and repairs',
	},
	{
		'id': 14,
		'name': 'Fitness',
		'amount': 100.0,
		'status': 'Active',
		'category': 'Health',
		'allow_overspending': false,
		'frequency': 'Weekly',
		'start_date': '2023-09-01',
		'end_date': '2023-09-30',
		'notes': 'Monthly fitness expenses',
	},
	{
		'id': 15,
		'name': 'Gifts',
		'amount': 150.0,
		'status': 'Planned',
		'category': 'Miscellaneous',
		'allow_overspending': false,
		'frequency': 'Bi-weekly',
		'start_date': '2023-11-01',
		'end_date': '2023-12-31',
		'notes': 'Gift budget for holidays',
	},
	{
		'id': 16,
		'name': 'Investments',
		'amount': 1000.0,
		'status': 'Active',
		'category': 'Savings',
		'allow_overspending': false,
		'frequency': 'Weekly',
		'start_date': '2023-01-01',
		'end_date': 'none',
		'notes': 'Investing for the future',
	},
	{
		'id': 17,
		'name': 'Charity',
		'amount': 50.0,
		'status': 'Active',
		'category': 'Donations',
		'allow_overspending': true,
		'frequency': 'Weekly',
		'start_date': '2023-09-01',
		'end_date': '2023-09-30',
		'notes': 'Monthly charitable donations',
	},
	{
		'id': 18,
		'name': 'Electronics',
		'amount': 200.0,
		'status': 'Planned',
		'category': 'Shopping',
		'start_date': '2023-10-01',
		'end_date': '2023-12-31',
		'notes': 'Upgrade electronic devices',
	},
	{
		'id': 19,
		'name': 'Pet Care',
		'amount': 75.0,
		'status': 'Active',
		'category': 'Pets',
		'allow_overspending': false,
		'frequency': 'Weekly',
		'start_date': '2023-10-01',
		'end_date': '2023-12-31',
		'notes': 'Upgrade electronic devices',
	},
];
export default budgets;
