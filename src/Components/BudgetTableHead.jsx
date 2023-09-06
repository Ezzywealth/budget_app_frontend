/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBudgetForm } from '../Redux/BudgetSlice';
import BudgetForm from './BudgetForm';

/* eslint-disable react/prop-types */

const TableHeader = () => {
	const tableItems = useSelector((state) => state.budget.tableItems);
	const budgets = useSelector((state) => state.budget.budgets);
	const showBudgetForm = useSelector((state) => state.budget.showBudgetForm);
	const dispatch = useDispatch();
	// function to handle the sorting lists by application and approval date
	const handleDateSort = (date) => {
		console.log(date);
	};

	return (
		<main className='w-full'>
			<section>
				{showBudgetForm && <BudgetForm />}
				<div className='flex justify-between pt-[45px] pb-[12px] items-center box-border border-b border-[#D7D8DA] border-solid'>
					<p className='text-[#0B101A] text-[20px] leading-[24px] font-semibold'>
						{new Date().toLocaleString('default', { month: 'long' })} Budget <span className='text-[#5A616A]'> ({`${budgets.length} Budget${budgets.length > 1 ? 's' : ''}`})</span>
					</p>
					<div className=' flex items-center gap-1 '></div>
				</div>
			</section>
			<section className='flex justify-between items-center mt-[12.37px]'>
				<button className='border py-1 text-white px-[16px] bg-[#2A3958] rounded-[10px]' onClick={() => dispatch(toggleBudgetForm())}>
					Add Budget
				</button>
			</section>
		</main>
	);
};

export default TableHeader;
