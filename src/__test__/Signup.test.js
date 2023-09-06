import { render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/store';
import SignUpComponent from '../Components/Authentication/Signup';
import { describe, it, expect } from '@jest/globals';

describe('Delete Cab', () => {
	it('renders sign up component', () => {
		const tree = TestRenderer.create(
			<Provider store={store}>
				<BrowserRouter>
					<SignUpComponent />
				</BrowserRouter>
			</Provider>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('renders Sign up form', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<SignUpComponent />
				</BrowserRouter>
			</Provider>
		);

		const header = screen.getByText(/Enter your details to sign up/i);
		expect(header).toBeInTheDocument();
	});
	it('renders sign up component and whows the already have an account test', async () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<SignUpComponent />
				</BrowserRouter>
			</Provider>
		);
		const subHead = screen.getByText(/Already have an account?/i);
		expect(subHead).toBeInTheDocument();
	});
});
