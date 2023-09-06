import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Redux/UserSlice';

const Navbar = () => {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const handleLogout = () => {
		Cookies.remove('authorization');
		Cookies.remove('user');
		dispatch(setUser());
	};
	return (
		<nav className='bg-blue-900 shadow-lg w-full md:w-screen p-4'>
			<div className='container mx-auto flex justify-between items-center'>
				<h1 className='text-2xl text-white font-semibold'>Bugdet Management</h1>
				<ul className='flex space-x-4'>
					<li>
						<a href='/' className='text-white hover:text-gray-300'>
							Home
						</a>
					</li>
					{!user ? (
						<li>
							<a href='/login' className='text-white hover:text-gray-300 cursor-pointer'>
								Login
							</a>
						</li>
					) : (
						<li>
							<a onClick={handleLogout} className='text-white hover:text-gray-300 cursor-pointer'>
								Logout
							</a>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
