import React, { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AuthProvider } from './Context';

import Header from "./header/Header";
import HeaderLower from './header/HeaderLower'
import Footer from "./components/Footer";
import ProductsMainView from './products/ProductsMainView'
import Logout from './auth/Logout';
import Search from "./components/search";
import ProductDetail from './products/ProductDetail'
import RegisterForm from './auth/Register'
import LoginForm from './auth/LoginForm'
import Profile from './profile/Profile';
import Cart from './cart/Cart';

export default function App() {

	return (
		<AuthProvider>
			<Router>
				<React.StrictMode>
					<Header />
					<HeaderLower/>
					<Switch>
						<Route exact path="/" component={ProductsMainView} />
						<Route exact path="/login" component={LoginForm} />
						<Route exact path="/logout" component={Logout} />
						<Route exact path="/register" component={RegisterForm} />
						<Route exact path="/user/profile" component={Profile} />
						<Route exact path="/products/:slug" component={ProductDetail} />
						<Route exact path="/olagh/search/" component={Search} />
						<Route exact path="/user/cart" component={Cart} />
					</Switch>
					<Footer />
				</React.StrictMode>
			</Router>
		</AuthProvider>
	);
}
