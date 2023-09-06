import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBudget } from '../Redux/BudgetSlice';
import { useState } from 'react';

const BudgetTable = () => {
	const tableItems = useSelector((state) => state.budget.tableItems);
	const budgets = useSelector((state) => state.budget.budgets);
	const budgetLoading = useSelector((state) => state.budget.budgetsLoading);
	const deleteLoading = useSelector((state) => state.budget.deleteLoading);
	const startCount = useSelector((state) => state.budget.startCount);
	const endCount = useSelector((state) => state.budget.endCount);
	const [activeId, setActive] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// navigate to the budget details page
	const handleBudgetClick = (budget) => {
		navigate(`/${budget.id}`);
	};

	const handleDelete = async (id) => {
		setActive(id);
		const resp = await dispatch(deleteBudget(id));
		console.log(resp);
		if (resp?.payload?.success) {
			navigate('/');
		}
	};

	return (
		<div className='w-full flex overflow-auto justify-center mt-4'>
			<table className='table-fixed w-full  md:w-[700px] border-separate border-spacing-0 border border-slate-200 '>
				<thead>
					<tr className='bg-[#EEF0F4]  divide-gray-50'>
						<th className='px-6 py-3 text-center text-base text-[#222222] font-semibold uppercase tracking-[0.04em]'>BudgetId </th>
						<th className='px-6 py-3 text-center text-base font-semibold text-[#222222] uppercase tracking-[0.04em] font-pretendard'>Name</th>
						<th className='px-6 py-3 text-center text-base text-[#222222] font-semibold uppercase tracking-[0.04em] font-pretendard'>Amount</th>
						<th className='px-6 py-3 text-center text-base text-[#222222] font-semibold uppercase tracking-[0.04em] font-pretendard'>Status</th>
						<th className='px-6 py-3 text-center text-base text-[#222222] font-semibold uppercase tracking-[0.04em] font-pretendard'>View</th>
						<th className='px-6 py-3 text-center text-base text-[#222222] font-semibold uppercase tracking-[0.04em] font-pretendard'>Delete</th>
					</tr>
				</thead>
				{budgetLoading ? (
					<dd className='flex w-full md:w-[700px] justify-center h-[500px]'>
						<RotatingLines strokeColor='#00d690' strokeWidth='5' animationDuration='0.75' width='60' visible={true} />
					</dd>
				) : (
					<tbody className='bg-white divide-y relative transition-all ease-linear duration-300'>
						{tableItems?.length < 1 ? (
							<tr className='flex mb-80 justify-center items-center'>
								<td className='text-center ' colSpan={9}>
									<h5 className='flex justify-center absolute w-full h-[300px] top-0 left-0  font-pretendard items-center '>You don&apos;t have any budget</h5>
								</td>
							</tr>
						) : (
							budgets?.slice(startCount, endCount)?.map((budget) => (
								<tr key={budget.id} className={`cursor-pointer ${budget?.selected === true ? 'bg-[#F9F9FB]' : ''}`}>
									<td className='px-6 py-4 text-center whitespace-nowrap border border-b-0 border-l-0  border-r-0 border-slate-300'>
										<dd className='text-sm text-[#222222] font-medium leading-[18px]'>{budget.id}</dd>
									</td>
									<td className='px-6  py-4  whitespace-nowrap border border-b-0 border-l-0 border-r-0 border-slate-300'>
										<h3 className='text-sm text-center text-[#222222] font-medium leading-[18px]'>{budget?.name}</h3>
									</td>
									<td className='px-6 font-pretendard py-4 align-middle whitespace-nowrap border border-l-0 border-b-0 border-r-0 border-slate-300'>
										<dd className='text-sm text-[#222222] font-medium leading-[18px] border bg-[#EBEEF3] rounded-lg justify-center px-[17px] flex items-center py-[6px]'>{budget?.amount}</dd>
									</td>

									<td className='px-6  py-4 align-middle whitespace-nowrap border border-b-0 border-l-0 border-r-0 border-slate-300'>
										<dd className={`text-sm rounded-[10px] flex justify-center items-center py-2 px-[10px] gap-[6px] leading-4 capitalize font-medium ${budget?.status === 'Active' && 'text-[#166534] bg-[#DCFCE7]'} ${budget?.status === 'rejected' && 'text-[#991B1B] bg-[#FEE2E2]'} ${budget.status === 'Planned' && 'text-[#9A3412] bg-[#FFEDD5]'}`}>{budget?.status}</dd>
									</td>
									<td className='px-3  py-4 align-middle whitespace-nowrap border border-b-0 border-l-0 border-r-0 border-slate-300'>
										<button onClick={() => handleBudgetClick(budget)} id='button' className='w-full text-white bg-[#265c7a] font-normal rounded-lg flex justify-center focus:outline-none items-center px-1 py-1 tracking-wider text-sm text-center transition-all duration-300 ease-linear '>
											view
										</button>
									</td>
									<td className='px-6  py-4 align-middle whitespace-nowrap border border-b-0 border-l-0 border-r-0 border-slate-300'>
										<button id='button' className='w-full text-white bg-[#d60024] font-normal rounded-lg flex justify-center focus:outline-none items-center px-5 py-1 tracking-wider text-sm text-center transition-all duration-300 ease-linear' onClick={() => handleDelete(budget?.id)}>
											{deleteLoading && activeId === budget.id ? <RotatingLines strokeColor='#ffffff' strokeWidth='5' animationDuration='0.75' width='20' visible={true} /> : 'Remove'}
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				)}
			</table>
		</div>
	);
};

export default BudgetTable;
