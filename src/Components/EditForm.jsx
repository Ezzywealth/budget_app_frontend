/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateBudget } from '../Redux/BudgetSlice';
import { RotatingLines } from 'react-loader-spinner';

const EditForm = ({ budget, setStartEdit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const updateLoading = useSelector((state) => state.budget.updateLoading);
	const [loading, setLoading] = useState(updateLoading);
	const dispatch = useDispatch();

	// a function to update the form details at the backend
	const updateBudget = async (data) => {
		const result = await dispatch(updateBudget({ ...data, id: budget.id }));
		if (result?.payload?.success) {
			setStartEdit(false);
		}
	};
	return (
		<div className='w-full fixed top-0 left-0 flex justify-center h-screen bg-gray-100 overflow-y-scroll z-[10000] py-10'>
			<section className='w-[600px] rounded-lg h-full py-12 overflow-auto bg-white p-4'>
				<div className='flex justify-end'>
					<button className='text-lg w-4 text-[#212121] font-semibold' type='button' onClick={() => setStartEdit(false)}>
						x
					</button>
				</div>
				<h2 className='text-3xl mb-4 text-center font-extrabold text-gray-900'>Update Budget</h2>
				<form onSubmit={handleSubmit(updateBudget)} className='grid grid-cols-2 p-4 gap-4'>
					<div>
						<label className='block mb-2 text-base font-semibold text-gray-600 text-start'>Name</label>
						<input
							defaultValue={budget?.name}
							disabled={loading}
							type='text'
							id='name'
							{...register('name', {
								required: 'Please enter a budget name',
							})}
							className={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5`}
							placeholder='Fitness'
						/>
						{errors?.name && <span className='text-red-500 text-sm'>{errors?.name?.message}</span>}
					</div>

					<div>
						<label className='block mb-2 text-base font-semibold text-gray-600 text-start'>Amount</label>
						<input
							disabled={loading}
							defaultValue={budget?.amount}
							type='number'
							id='amount'
							{...register('amount', {
								required: 'Please enter a budget amount',
								min: 10,
							})}
							className={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5`}
							placeholder='100'
						/>
						{errors?.amount && <span className='text-red-500 text-sm'>{errors?.amount?.message}</span>}
					</div>
					<div className='col-span-2'>
						<label className='block mb-2 text-base font-semibold text-gray-600 text-start'>Status</label>
						<input
							disabled={loading}
							defaultValue={budget.status}
							type='text'
							id='status'
							{...register('email', {
								required: 'Please enter a budget status',
							})}
							className={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5`}
							placeholder='active, pending, done'
						/>
						{errors?.status && <span className='text-red-500 text-sm'>{errors?.status?.message}</span>}
					</div>
					<div>
						<label className='block mb-2 text-base font-semibold text-gray-600 text-start'>Category</label>
						<input
							disabled={loading}
							defaultValue={budget.category}
							type='text'
							id='category'
							{...register('category', {
								required: 'Please enter a budget category',
							})}
							className={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5`}
							placeholder='Fitness'
						/>
						{errors?.category && <span className='text-red-500 text-sm'>{errors?.category?.message}</span>}
					</div>
					<div>
						<label className='block mb-2 text-base font-semibold text-gray-600 text-start'>Frequency</label>
						<input
							disabled={loading}
							defaultValue={budget.frequency}
							type='text'
							id='frequency'
							{...register('frequency', {
								required: 'Please enter a budget frequency',
							})}
							className={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5`}
							placeholder='weekly, biweekly, monthly'
						/>
						{errors?.frequency && <span className='text-red-500 text-sm'>{errors?.frequency?.message}</span>}
					</div>

					<div>
						<label className='block mb-2 text-base font-semibold text-gray-600 text-start'>start Date</label>
						<input
							defaultValue={budget?.start_date}
							disabled={loading}
							type='date'
							id='start_date'
							{...register('start_date', {
								required: 'Please select a budget start date',
							})}
							className={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5`}
							placeholder='Fitness'
						/>
						{errors?.start_date && <span className='text-red-500 text-sm'>{errors?.start_date?.message}</span>}
					</div>
					<div>
						<label className='block mb-2 text-base font-semibold text-gray-600 text-start'>End Date</label>
						<input
							defaultValue={budget?.end_date}
							disabled={loading}
							type='date'
							id='end_date'
							{...register('end_date', {
								required: 'Please select a budget end date',
							})}
							className={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5`}
							placeholder='Fitness'
						/>
						{errors?.end_date && <span className='text-red-500 text-sm'>{errors?.end_date?.message}</span>}
					</div>
					<div className='col-span-2'>
						<label className='block mb-2 text-base font-semibold text-gray-600 text-start'>Notes</label>
						<textarea
							disabled={loading}
							defaultValue={budget.notes}
							type='text'
							rows={5}
							id='notes'
							{...register('notes', {
								required: 'Please enter a budget notes',
							})}
							className={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5`}
							placeholder='Fitness'
						/>
						{errors?.notes && <span className='text-red-500 text-sm'>{errors?.notes?.message}</span>}
					</div>
					<div className='flex items-center w-full col-span-2 my-4'>
						<label className='flex items-center gap-4  text-base font-semibold text-gray-600'>
							<input defaultChecked={budget?.allow_overspending} disabled={loading} type='checkbox' id='allow_overspending' {...register('allow_overspending', { required: false })} className={` border-gray-300 sm:text-sm  focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 `} />
							<h4> Allow Over Spending</h4>
						</label>
					</div>
					<div className='col-span-2'>
						<button disabled={loading} type='submit' className='w-full text-white bg-[#00d690] font-medium rounded-lg flex justify-center focus:outline-none items-center px-5 py-3 tracking-wider text-xl text-center transition-all duration-300 ease-linear '>
							{updateLoading ? <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='30' visible={true} /> : <span> Submit</span>}
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default EditForm;
