/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/UserSlice';

const Layout = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setUser());
	}, []);

	return <main>{children}</main>;
};

export default Layout;
