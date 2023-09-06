import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBudget } from '../Redux/BudgetSlice';

const BudgetTable = () => {
	const tableItems = useSelector((state) => state.budget.tableItems);
	const budgetLoading = useSelector((state) => state.budget.budgetsLoading);
	const deleteLoading = useSelector((state) => state.budget.deleteLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// navigate to the budget details page
	const handleBudgetClick = (budget) => {
		navigate(`/${budget.id}`);
	};

	const handleDelete = async (id) => {
		const resp = await dispatch(deleteBudget(id));
		console.log(resp);
		if (resp?.payload?.success) {
			navigate('/');
		}
	};

	return (
		<div className='w-full flex justify-center mt-4'>
			<table className='table-fixed  w-[700px] border-separate border-spacing-0 border border-slate-200 '>
				<thead>
					<tr className='bg-[#EEF0F4]  divide-gray-50'>
						<th className='px-6 py-3 text-center text-base text-[#222222] font-semibold uppercase tracking-[0.04em]'>BudgetId </th>
						<th className='px-6 py-3 text-center text-base font-semibold text-[#222222] uppercase tracking-[0.04em] font-pretendard'>Name</th>
						<th className='px-6 py-3 text-center text-base text-[#222222] font-semibold uppercase tracking-[0.04em] font-pretendard'>Amount</th>
						<th className='px-6 py-3 text-center text-base text-[#222222] font-semibold uppercase tracking-[0.04em] font-pretendard'>Status</th>
						<th className='px-6 py-3 text-center text-base text-[#222222] font-semibold uppercase tracking-[0.04em] font-pretendard'>Action</th>
					</tr>
				</thead>
				{budgetLoading ? (
					<div className='flex w-full md:w-[600px] justify-center h-[500px]'>
						<RotatingLines strokeColor='#00d690' strokeWidth='5' animationDuration='0.75' width='60' visible={true} />
					</div>
				) : (
					<tbody className='bg-white divide-y relative transition-all ease-linear duration-300'>
						{tableItems?.length < 1 ? (
							<tr className='flex mb-80 justify-center items-center'>
								<td className='text-center ' colSpan={9}>
									<div className='flex justify-center absolute w-full h-[300px] top-0 left-0  font-pretendard items-center '>No search results found</div>
								</td>
							</tr>
						) : (
							tableItems?.slice(0, 5)?.map((budget, ind) => (
								<tr key={budget.id} className={`cursor-pointer ${budget?.selected === true ? 'bg-[#F9F9FB]' : ''}`} onClick={() => handleBudgetClick(budget)}>
									<td className='px-6 py-4 text-center whitespace-nowrap border border-b-0 border-l-0  border-r-0 border-slate-300'>
										<div className='text-sm text-[#222222] font-medium leading-[18px]'>{ind + 1}</div>
									</td>
									<td className='px-6  py-4  whitespace-nowrap border border-b-0 border-l-0 border-r-0 border-slate-300'>
										<h3 className='text-sm text-center text-[#222222] font-medium leading-[18px]'>{budget?.name}</h3>
									</td>
									<td className='px-6 font-pretendard py-4 align-middle whitespace-nowrap border border-l-0 border-b-0 border-r-0 border-slate-300'>
										<div className='text-sm text-[#222222] font-medium leading-[18px] border bg-[#EBEEF3] rounded-lg justify-center px-[17px] flex items-center py-[6px]'>{budget?.amount}</div>
									</td>

									<td className='px-6  py-4 align-middle whitespace-nowrap border border-b-0 border-l-0 border-r-0 border-slate-300'>
										<div className={`text-sm rounded-[10px] flex justify-center items-center py-2 px-[10px] gap-[6px] leading-4 capitalize font-medium ${budget?.status === 'Active' && 'text-[#166534] bg-[#DCFCE7]'} ${budget?.status === 'rejected' && 'text-[#991B1B] bg-[#FEE2E2]'} ${budget.status === 'Planned' && 'text-[#9A3412] bg-[#FFEDD5]'}`}>{budget?.status}</div>
									</td>
									<td className='px-6  py-4 align-middle whitespace-nowrap border border-b-0 border-l-0 border-r-0 border-slate-300'>
										<div className='col-span-2'>
											<button id='button' className='w-full text-white bg-[#d60024] font-medium rounded-lg flex justify-center focus:outline-none items-center px-4 py-2 tracking-wider text-xl text-center transition-all duration-300 ease-linear' onClick={() => handleDelete(budget?.id)}>
												{deleteLoading ? <RotatingLines strokeColor='#d60024' strokeWidth='5' animationDuration='0.75' width='30' visible={true} /> : 'Remove'}
											</button>
										</div>
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
