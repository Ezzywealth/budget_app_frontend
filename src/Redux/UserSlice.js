import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_KEY;
const initialState = {
	user: null,
	signupLoading: false,
	signupError: '',
	loginLoading: false,
	loginError: '',
};

export const signup = createAsyncThunk('user/signup', async (user) => {
	const { data } = await axios.post(`${baseUrl}/signup`, { user });
	console.log(data);
	return data;
});

export const login = createAsyncThunk('user/login', async (user) => {
	const response = await axios.post(`${baseUrl}/login`, { user });
	const { data } = response;
	console.log(response);
	localStorage.setItem('authorization', JSON.stringify(response.headers.authorization));
	// localStorage.setItem('user', JSON.stringify(data.data.user));
	console.log(data);
	return data;
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signup.pending, (state) => {
			state.signupLoading = true;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			state.user = action.payload;
			state.signupLoading = false;
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
			state.user = action?.payload?.user;
			state.loginLoading = false;
			state.loginError = '';
		});
		builder.addCase(login.rejected, (state) => {
			state.user = null;
			state.loginLoading = false;
		});
	},
});

export default userSlice.reducer;
