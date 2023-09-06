import { useEffect } from 'react';
import './App.css';
import BudgetManagement from './Components/BudgetManagement';
import { useDispatch } from 'react-redux';
import { fetchBudgets } from './Redux/BudgetSlice';
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBudgets());
	}, []);
	return (
		<main className='w-full h-full flex'>
			<BudgetManagement />
		</main>
	);
}

export default App;
