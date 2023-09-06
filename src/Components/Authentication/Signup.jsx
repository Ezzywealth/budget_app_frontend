import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../Redux/UserSlice';

const Signup = () => {
	const loading = useSelector((state) => state.user.signupLoading);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// a function to handle the signup
	const handleSignup = async (data) => {
		const resp = await dispatch(signup(data));
		if (resp?.payload?.status?.code === 200) {
			navigate('/');
		}
	};

	return (
		<section className='h-screen p-4 pt-[80px] laptop:px-20 overflow-auto  flex justify-center items-center w-full   '>
			<div className='w-full relative flex justify-center'>
				<div className='w-full  mt-10 py-8  bg-white rounded-lg shadow-lg  my-12 md:my-4  xl:p-8 overflow-auto '>
					<div className='p-4 tablet:p-6 space-y-2 md:space-y-4 sm:p-8'>
						<h1 className='text-base flex justify-center mb-8 font-bold leading-tight tracking-tight text-my-primary md:text-2xl  capitalize'>Enter your details to sign up</h1>
						<form className='space-y-4 tablet:space-y-6  w-full md:w-[450px]' onSubmit={handleSubmit(handleSignup)}>
							<div>
								<label className='block mb-2 text-base font-semibold text-gray-600 dark:text-white'>Name</label>
								<input
									disabled={loading}
									type='text'
									id='name'
									{...register('name', {
										required: 'Please enter your email',
									})}
									className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
									placeholder='E-mail'
								/>
								{errors?.name && <span className='text-red-500 text-sm'>{errors?.name?.message}</span>}
							</div>
							<div>
								<label className='block mb-2 text-base font-semibold text-gray-600 dark:text-white'>E-mail</label>
								<input
									disabled={loading}
									type='email'
									id='email'
									{...register('email', {
										required: 'Please enter your email',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: 'Please enter a valid email address',
										},
									})}
									className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
									placeholder='E-mail'
								/>
								{errors?.email && <span className='text-red-500 text-sm'>{errors?.email?.message}</span>}
							</div>

							<div>
								<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
								<input
									disabled={loading}
									type='password'
									{...register('password', {
										required: 'Please enter your password',
										minLength: {
											value: 7,
											message: 'Password must be at least 7 characters long',
										},
									})}
									id='password'
									placeholder='••••••••'
									className={`bg-gray-50 border-2 border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
								/>
								{errors?.password && <span className='text-red-500 text-sm'>{errors?.password?.message}</span>}
							</div>
							<button disabled={loading} type='submit' className='w-full text-white bg-[#00d960]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg flex justify-center items-center px-5 py-3 tracking-wider text-xl text-center  transition-all duration-300 ease-linear dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
								{loading ? <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='30' visible={true} /> : <span> Sign up</span>}
							</button>
							<div className='flex flex-col'>
								<p className='text-sm font-light  text-gray-500 dark:text-gray-400'>
									Already have an account?
									<Link to='/login' className=' ml-2 hover:text-blue-500 font-semibold text-primary-600 hover:underline dark:text-primary-500'>
										Login
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Signup;
