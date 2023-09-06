import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './ErrorPage.jsx';
import Budget from './Components/Budget.jsx';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import Login from './Components/Authentication/Login.jsx';
import Signup from './Components/Authentication/Signup.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Layout.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/:budgetId',
		element: <Budget />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Layout>
				<ToastContainer position='top-center' />
				<RouterProvider router={router} />
			</Layout>
		</Provider>
	</React.StrictMode>
);
