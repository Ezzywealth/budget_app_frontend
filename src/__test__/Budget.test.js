import { render } from '@testing-library/react';
import Budget from '../Components/Budget'; // Adjust the import path as needed
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { describe, test, expect } from '@jest/globals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import budgets from '../utils/data';

const mock = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);

/**
 * @jest-environment jsdom
 */

describe('Budget', () => {
	mock.onGet('http://127.0.0.1:3001/api/v1/budgetlists').reply(200, budgets[0]);
	test('renders Budget component correctly', () => {
		const { asFragment } = render(
			<Provider store={mockStore(store.getState())}>
				<BrowserRouter>
					<Budget />
				</BrowserRouter>
			</Provider>
		);
		expect(asFragment()).toMatchSnapshot();
	});

	test('renders component with Provider and BrowserRouter', () => {
		render(
			<Provider store={mockStore(store.getState())}>
				<BrowserRouter>
					<Budget />
				</BrowserRouter>
			</Provider>
		);
		// Check if the "Budget Details" heading is present

		const headingElement = screen.getByText(/Budget Details/i);
		expect(headingElement).toBeInTheDocument();

		// Check if the loading spinner is present when budgetLoading is true

		const spendingText = screen.getByText(/Allow Overspending/i); // Assuming you have a test ID for the spinner
		expect(spendingText).toBeInTheDocument();

		const categoryText = screen.getByText(/Category/i); // Assuming you have a test ID for the spinner
		expect(categoryText).toBeInTheDocument();

		const nameText = screen.getByText(/Name/i); // Assuming you have a test ID for the spinner
		expect(nameText).toBeInTheDocument();

		const dateText = screen.getByText(/End Date/i);
		expect(dateText).toBeInTheDocument();

		// Check if the "Edit Budget" button is present

		const editButton = screen.getByText(/Edit Budget/i);
		expect(editButton).toBeInTheDocument();
	});
});
