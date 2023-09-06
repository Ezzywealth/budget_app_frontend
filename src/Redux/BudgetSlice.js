import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = 'https://budget-management-app-w5ih.onrender.com/api/v1';
// const baseUrl = import.meta.env.VITE_API_KEY;

const initialState = {
	budgets: [],
	budget: {},
	tableItems: [],
	noPerPage: 5,
	currentPage: 1,
	startCount: 0,
	endCount: 5,
	selectedBudget: {},
	showBudgetForm: false,
	budgetsLoading: false,
	budgetsError: '',
	budgetLoading: false,
	budgetError: '',
	createLoading: false,
	createError: '',
	updateLoading: false,
	updateError: '',
	deleteLoading: false,
	deleteError: '',
};

const getAuthToken = () => {
	return Cookies.get('authorization');
};

export const fetchBudgets = createAsyncThunk('budgets/fetchBudgets', async () => {
	const token = getAuthToken();
	const { data } = await axios.get(`${baseUrl}/budgetlists/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
});

export const fetchSingleBudget = createAsyncThunk('budgets/fetchSingleBudget', async (id) => {
	const token = getAuthToken();
	const { data } = await axios.get(`${baseUrl}/budgetlists/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
});

export const createBudget = createAsyncThunk('budgets/createBudget', async (budget) => {
	const token = getAuthToken();
	const { data } = await axios.post(`${baseUrl}/budgetlists`, {
		budget,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
});

export const updateBudget = createAsyncThunk('budgets/updateBudget', async (budget) => {
	const token = getAuthToken();
	console.log(budget);
	const { data } = await axios.put(`${baseUrl}/budgetlists/${budget?.id}`, {
		budget,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
});

export const deleteBudget = createAsyncThunk('budgets/deleteBudget', async (id) => {
	const token = getAuthToken();
	const { data } = await axios.delete(`${baseUrl}/budgetlists/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
});

const budgetSlice = createSlice({
	name: 'budget',
	initialState,
	reducers: {
		setTableItems: (state, action) => {
			state.tableItems = state.budgets.filter((budget) => budget.category === action.payload);
		},
		addNewBudget: (state, action) => {
			const newBudget = action.payload;
			state.budgets.unshift(newBudget);
		},
		toggleBudgetForm: (state) => {
			state.showBudgetForm = !state.showBudgetForm;
		},
		handleNextPage: (state) => {
			console.log('next');
			const totalPages = Math.ceil(state.budgets.length / state.noPerPage);
			if (state.currentPage === totalPages) return;
			state.startCount = Math.min(state.startCount + state.noPerPage, state.budgets.length);
			state.endCount = Math.min(state.endCount + state.noPerPage, state.budgets.length);
			state.tableItems = state.budgets.slice(state.startCount, state.endCount);
			state.currentPage += 1;
		},

		handlePrevPage: (state) => {
			console.log('prev');
			if (state.currentPage === 1) return;
			state.startCount = Math.max(state.startCount - state.noPerPage, 0);
			state.endCount = Math.max(state.endCount - state.noPerPage, state.noPerPage);
			state.tableItems = state.budgets.slice(state.startCount, state.endCount);
			state.currentPage -= 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBudgets.pending, (state) => {
				state.budgetsLoading = true;
			})
			.addCase(fetchBudgets.fulfilled, (state, action) => {
				state.budgetsLoading = false;
				console.log(action.payload);
				state.budgets = action.payload;
				state.tableItems = action.payload;
				state.budgetsError = '';
			})
			.addCase(fetchBudgets.rejected, (state, action) => {
				state.budgetsLoading = false;
				state.budgets = [];
				state.budgetsError = action.error.message;
			})
			.addCase(fetchSingleBudget.pending, (state) => {
				state.budgetLoading = true;
			})
			.addCase(fetchSingleBudget.fulfilled, (state, action) => {
				state.budgetLoading = false;
				console.log(action.payload);
				state.selectedBudget = action.payload;
				state.budgetError = '';
			})
			.addCase(fetchSingleBudget.rejected, (state) => {
				state.budgetLoading = false;
				state.selectedBudget = {};
				state.budgetError = 'Budget not found';
			})
			.addCase(createBudget.pending, (state) => {
				state.createLoading = true;
			})
			.addCase(createBudget.fulfilled, (state, action) => {
				state.createLoading = false;
				state.budgets.unshift(action.payload);
				state.tableItems.unshift(action.payload);
				state.createError = '';
			})
			.addCase(createBudget.rejected, (state, action) => {
				state.createLoading = false;
				state.budget = {};
				state.createError = action.error.message;
			})
			.addCase(updateBudget.pending, (state) => {
				state.updateLoading = true;
			})
			.addCase(updateBudget.fulfilled, (state, action) => {
				state.updateLoading = false;
				state.selectedBudget = action.payload.budget;
				state.budgets = state.budgets.map((budget) => (budget.id === action.payload.id ? action.payload.budget : budget));
				state.tableItems = state.tableItems.map((budget) => (budget.id === action.payload.id ? action.payload.budget : budget));
				state.updateError = '';
			})
			.addCase(updateBudget.rejected, (state, action) => {
				state.updateLoading = false;
				state.budget = {};
				state.updateError = action.error.message;
			})
			.addCase(deleteBudget.pending, (state) => {
				state.deleteLoading = true;
			})
			.addCase(deleteBudget.fulfilled, (state, action) => {
				state.deleteLoading = false;
				state.budgets = state.budgets.filter((budget) => budget.id !== action.payload.id);
				state.tableItems = state.tableItems.filter((budget) => budget.id !== action.payload.id);
				state.updateError = '';
			})
			.addCase(deleteBudget.rejected, (state, action) => {
				state.deleteLoading = false;
				state.budget = {};
				state.updateError = action.error.message;
			});
	},
});

export default budgetSlice.reducer;
export const { addNewBudget, selectBudget, toggleBudgetForm, handlePrevPage, handleNextPage } = budgetSlice.actions;
