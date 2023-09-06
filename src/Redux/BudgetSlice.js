import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_KEY;

const initialState = {
	budgets: [],
	budget: {},
	tableItems: [],
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

export const fetchBudgets = createAsyncThunk('budgets/fetchBudgets', async () => {
	const { data } = await axios.get(`${baseUrl}/budgetlists/`);
	return data;
});

export const fetchSingleBudget = createAsyncThunk('budgets/fetchSingleBudget', async (id) => {
	const { data } = await axios.get(`${baseUrl}/budgetlists/${id}`);
	return data;
});

export const createBudget = createAsyncThunk('budgets/createBudget', async (budget) => {
	const { data } = await axios.post(`${baseUrl}/budgetlists`, { budget });
	console.log(data);
	return data;
});

export const updateBudget = createAsyncThunk('budgets/updateBudget', async (budget) => {
	console.log(budget);
	const { data } = await axios.put(`${baseUrl}/budgetlists/${budget?.id}`, { budget });
	return data;
});

export const deleteBudget = createAsyncThunk('budgets/deleteBudget', async (id) => {
	const { data } = await axios.delete(`${baseUrl}/budgetlists/${id}`);
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
				console.log(action.payload);
				state.budget = state.budgets.unshift(action.payload);
				state.tableItems = state.tableItems.unshift(action.payload);
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
export const { addNewBudget, selectBudget, toggleBudgetForm } = budgetSlice.actions;
