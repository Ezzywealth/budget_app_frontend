const ErrorPage = () => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
			<div className='max-w-md p-6 bg-white rounded-lg shadow-md'>
				<h1 className='text-4xl font-bold text-red-600'>Oops, something went wrong!</h1>
				<p className='mt-4 text-gray-600'>It seems there was an error. Please try again later.</p>
				<button onClick={() => window.location.reload()} className='mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700'>
					Reload Page
				</button>
			</div>
		</div>
	);
};

export default ErrorPage;
