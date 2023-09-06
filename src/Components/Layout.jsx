/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/UserSlice';
import Navbar from './Navbar';

const Layout = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setUser());
	}, []);

	return (
		<main className='w-full flex overflow-auto flex-col items-center'>
			<Navbar />
			<section>{children}</section>
		</main>
	);
};

export default Layout;
