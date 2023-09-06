import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const baseUrl = 'https://budget-management-app-w5ih.onrender.com/api/v1';
// const baseUrl = import.meta.env.VITE_API_KEY;
const initialState = {
	user: null,
	signupLoading: false,
	signupError: '',
	loginLoading: false,
	loginError: '',
};

export const signup = createAsyncThunk('user/signup', async (user) => {
	const response = await axios.post(`${baseUrl}/signup`, { user });
	console.log(response);
	return response;
});

export const login = createAsyncThunk('user/login', async (user) => {
	const response = await axios.post(`${baseUrl}/login`, { user });
	const { data } = response;
	if (response.status === 200) {
		Cookies.set('authorization', response?.headers?.authorization.split(' ')[1], { expires: 3 });
		Cookies.set('user', JSON.stringify(data?.status?.data?.user), { expires: 3 });
	}
	return data.status;
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state) => {
			state.user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signup.pending, (state) => {
			state.signupLoading = true;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			toast.success('Sign up successful');
			const response = action.payload;
			const { data } = response;
			state.user = data.user;
			state.signupLoading = false;
			localStorage.setItem('authorization', JSON.stringify(response?.headers.authorization));
			localStorage.setItem('user', JSON.stringify(data?.data.user));
			state.signupError = '';
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.user = null;
			state.signupLoading = false;
			state.signupError = action.error.message;
		});
		builder.addCase(login.pending, (state) => {
			state.loginLoading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			toast.success('Signin successful');
			const data = action.payload;
			state.user = data?.user;
			state.loginLoading = false;
			state.loginError = '';
		});
		builder.addCase(login.rejected, (state, action) => {
			console.log(action.payload);
			toast.error('There was an error, try again');
			state.user = null;
			state.loginLoading = false;
		});
	},
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
