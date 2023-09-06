/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBudgetForm } from '../Redux/BudgetSlice';
import BudgetForm from './BudgetForm';

/* eslint-disable react/prop-types */

const TableHeader = () => {
	const tableItems = useSelector((state) => state.budget.tableItems);
	const showBudgetForm = useSelector((state) => state.budget.showBudgetForm);
	const dispatch = useDispatch();
	// function to handle the sorting lists by application and approval date
	const handleDateSort = (date) => {
		console.log(date);
	};

	return (
		<>
			<section>
				{showBudgetForm && <BudgetForm />}
				<div className='flex justify-between pt-[45px] pb-[12px] items-center box-border border-b border-[#D7D8DA] border-solid'>
					<p className='text-[#0B101A] text-[20px] leading-[24px] font-semibold'>
						{new Date().toDateString()} Budget <span className='text-[#5A616A]'> ({`${tableItems.length} Budgets | 10 pending approval`})</span>
					</p>
					<div className=' flex items-center gap-1 '>
						<select name='Approval Status' id='approval_status' defaultValue='Approval Status' className='capitalize'>
							<option disabled className='transition-all duration-300 ease-linear'>
								Approval Status
							</option>
							{/* {approvalStatus.map((item) => {
								return (
									<option key={item.id} value={item.title} className='transition-all capitalize duration-300 ease-linear'>
										{item.title}
									</option>
								);
							})} */}
						</select>

						{/* <select name='Approval Status' id='approval_status' className='capitalize' onChange={(e) => handleDateSort(e.target.value)}>
							{sortByDate.map((item) => {
								return (
									<option key={item.id} value={item.title} className='transition-all capitalize duration-300 ease-linear'>
										{item.title}
									</option>
								);
							})}
						</select> */}
						{/* <select name='Approval Status' id='approval_status' className='capitalize'>
							{itemsToView.map((item) => {
								return (
									<option key={item.id} value={item.number} className='transition-all capitalize duration-300 ease-linear'>
										{`view ${item.number} items`}
									</option>
								);
							})}
						</select> */}
					</div>
				</div>
			</section>
			<section className='flex justify-between items-center mt-[12.37px]'>
				<button className='border py-1 text-white px-[16px] bg-[#2A3958] rounded-[10px]' onClick={() => dispatch(toggleBudgetForm())}>
					Add Budget
				</button>
				<div className='flex justify-between items-center gap-1'>
					{/* <select name='Approval Status' id='approval_status' className='capitalize focus:outline-none'>
						{approvalStatus.map((item) => {
							return (
								<option key={item.id} value={item.title}>
									{item.title}
								</option>
							);
						})}
					</select> */}
					<button className='border py-1 text-white px-[16px] bg-[#2A3958] rounded-[10px]'>Save</button>
				</div>
			</section>
		</>
	);
};

export default TableHeader;
