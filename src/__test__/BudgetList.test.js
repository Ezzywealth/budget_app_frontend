import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import store from '../Redux/store';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import budgets from '../utils/data';
import App from '../App';

const mock = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);
// Mock Redux store

describe('BudgetTable Component', () => {
	mock.onGet('http://127.0.0.1:3001/api/v1/budgetlists').reply(200, budgets);

	it('renders Budget component correctly', () => {
		const { asFragment } = render(
			<Provider store={mockStore(store.getState())}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
