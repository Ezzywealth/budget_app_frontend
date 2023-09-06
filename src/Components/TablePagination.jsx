/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useSelector } from 'react-redux';
const Pagination = () => {
	const tableItems = useSelector((state) => state.budget.tableItems);
	// Function to handle the jump to the page number clicked

	// Function to handle the next page button
	const handleNext = () => {};

	// Function to handle the previous page button
	const handlePrev = () => {};

	// Function to handle the double next jump button
	const handleDoubleNextJump = () => {};

	// Function to handle the double previous jump button
	const handleDoublePrevJump = () => {};

	return (
		<div className='bg-[#F1F3F5] flex justify-center w-full'>
			<section className='flex'>
				<span className='flex items-center'>
					<MdKeyboardDoubleArrowLeft onClick={handleDoublePrevJump} className='text-xl text-[#9599A1]  cursor-pointer' />
					<MdKeyboardArrowLeft onClick={handlePrev} className='text-xl text-[#9599A1]  cursor-pointer' />
				</span>
				<div className='flex items-center mx-4 gap-1 p-[12px]'>
					{
						//convert the number of pages to an array
						[...Array(Math.ceil(tableItems?.length / 2))].map((item, ind) => (
							<button key={ind} className={`font-bold transition-all ease-linear duration-300 text-[16px] cursor-pointer h-8 w-8 flex items-center text-base gap-4 justify-center `}>
								{ind + 1}
							</button>
						))
					}
				</div>
				<span className='flex items-center'>
					<MdKeyboardArrowRight onClick={handleNext} className='text-xl text-[#9599A1]  cursor-pointer' />
					<MdKeyboardDoubleArrowRight onClick={handleDoubleNextJump} className='text-xl text-[#9599A1] cursor-pointer ' />
				</span>
			</section>
		</div>
	);
};

export default Pagination;
