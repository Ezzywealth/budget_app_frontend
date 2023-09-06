import { useSelector } from 'react-redux';
import BudgetTable from './BudgetTable';
import TableHeader from './BudgetTableHead';
import Pagination from './TablePagination';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const BudgetManagement = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);
	// an effect to check if the user is logged in
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [navigate, user]);

	return (
		<main className='flex flex-col mt-16 w-full px-4 h-screen'>
			<TableHeader />
			<BudgetTable />
			<Pagination />
		</main>
	);
};

export default BudgetManagement;
