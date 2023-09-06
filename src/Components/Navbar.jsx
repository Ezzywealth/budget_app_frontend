const Navbar = () => {
	return (
		<nav className='bg-blue-500 p-4'>
			<div className='container mx-auto flex justify-between items-center'>
				<h1 className='text-2xl text-white font-semibold'>Bugdet Management</h1>
				<ul className='flex space-x-4'>
					<li>
						<a href='/' className='text-white hover:text-gray-300'>
							Home
						</a>
					</li>
					<li>
						<a href='/login' className='text-white hover:text-gray-300'>
							Login
						</a>
					</li>
					<li>
						<a href='/logout' className='text-white hover:text-gray-300'>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
