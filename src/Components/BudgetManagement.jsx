import { useSelector } from 'react-redux';
import BudgetTable from './BudgetTable';
import TableHeader from './BudgetTableHead';
import Pagination from './TablePagination';
const BudgetManagement = () => {
	const budgets = useSelector((state) => state.budget.budgets);
	const user = useSelector((state) => state.user.user);
	console.log(user);
	console.log(budgets);
	return (
		<main className='flex flex-col justify-center h-screen'>
			<TableHeader />
			<BudgetTable />
			<Pagination />
		</main>
	);
};

export default BudgetManagement;
