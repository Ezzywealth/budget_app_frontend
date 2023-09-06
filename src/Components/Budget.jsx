import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBudget, fetchSingleBudget } from '../Redux/BudgetSlice';

import EditForm from './EditForm';
import { RotatingLines } from 'react-loader-spinner';
const Budget = () => {
	const navigate = useNavigate();
	const budget = useSelector((state) => state.budget.selectedBudget);
	const budgetLoading = useSelector((state) => state.budget.budgetLoading);
	const deleteLoading = useSelector((state) => state.budget.deleteLoading);
	const [startEdit, setStartEdit] = useState(false);
	const { budgetId } = useParams();
	const dispatch = useDispatch();

	// useEffect to fetch a single budget details
	useEffect(() => {
		dispatch(fetchSingleBudget(budgetId));
	}, [budgetId, dispatch]);

	// a function to open up the edit form
	const editBudget = () => {
		setStartEdit(true);
	};

	// a function to delete the budget
	const handleDelete = async () => {
		const resp = await dispatch(deleteBudget(budgetId));
		console.log(resp);
		if (resp?.payload?.success) {
			navigate('/');
		}
	};

	return (
		<section className='w-full py-4 flex items-center h-screen'>
			{startEdit && <EditForm budget={budget} setStartEdit={setStartEdit} />}
			<div className='bg-gray-500 mx-4  flex flex-col w-full justify-center py-6 px-4 lg:px-8'>
				<div className='mt-8 mx-auto w-full'>
					<div className='bg-white py-8 px-2 shadow sm:rounded-lg w-[360px] md:w-[500px]'>
						<h2 className='text-3xl text-center font-extrabold text-gray-900'>Budget Details</h2>
						{budgetLoading ? (
							<div className='flex justify-center h-[500px]'>
								<RotatingLines strokeColor='#00d690' strokeWidth='5' animationDuration='0.75' width='60' visible={true} />
							</div>
						) : (
							<div className='mt-6'>
								<div className='flex justify-between items-center sm:gap-4 sm:px-6 sm:py-3'>
									<dt className='text-lg text-gray-500 font-semibold '>Name</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{budget?.name}</dd>
								</div>
								<div className='flex justify-between items-center sm:gap-4 sm:px-6 sm:py-3'>
									<dt className='text-lg text-gray-500 font-semibold '>Amount</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>${budget?.amount?.toFixed(2)}</dd>
								</div>
								<div className='flex justify-between items-center sm:gap-4 sm:px-6 sm:py-3'>
									<dt className='text-lg text-gray-500 font-semibold '>Status</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{budget?.status}</dd>
								</div>
								<div className='flex justify-between items-center sm:gap-4 sm:px-6 sm:py-3'>
									<dt className='text-lg text-gray-500 font-semibold '>Category</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{budget?.category}</dd>
								</div>
								<div className='flex justify-between items-center sm:gap-4 sm:px-6 sm:py-3'>
									<dt className='text-lg text-gray-500 font-semibold '>Allow Overspending</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{budget?.allow_overspending ? 'Yes' : 'No'}</dd>
								</div>
								<div className='flex justify-between items-center sm:gap-4 sm:px-6 sm:py-3'>
									<dt className='text-lg text-gray-500 font-semibold '>Start Date</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{budget?.start_date}</dd>
								</div>
								<div className='flex justify-between items-center sm:gap-4 sm:px-6 sm:py-3'>
									<dt className='text-lg text-gray-500 font-semibold '>End Date</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{budget?.start_date}</dd>
									</dd>
								</div>
								<div className='flex justify-between items-center sm:gap-4 sm:px-6 sm:py-3'>
									<dt className='text-lg text-gray-500 font-semibold '>Note</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{budget?.notes}</dd>
									</dd>
								</div>
							</div>
						)}
					</div>
					<div className=' flex flex-col md:flex-row gap-4 px-4 my-4 md:gap-20 justify-between mt-4'>
						<button className='w-full text-white bg-[#a3915a] font-medium rounded-lg flex justify-center focus:outline-none items-center px-4 py-2 tracking-wider text-xl text-center transition-all duration-300 ease-linear' onClick={editBudget}>
							Edit Budget
						</button>
						<button className='w-full text-white bg-[#d60024] font-medium rounded-lg flex justify-center focus:outline-none items-center px-4 py-2 tracking-wider text-xl text-center transition-all duration-300 ease-linear' onClick={handleDelete}>
							{deleteLoading ? <RotatingLines strokeColor='#d60024' strokeWidth='5' animationDuration='0.75' width='30' visible={true} /> : <span>Delete Budget</span>}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Budget;
