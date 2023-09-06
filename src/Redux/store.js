import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from './BudgetSlice';
import userReducer from './UserSlice';

const store = configureStore({
	reducer: {
		budget: budgetReducer,
		user: userReducer,
	},
});

export default store;
