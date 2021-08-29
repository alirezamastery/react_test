import React, { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AuthProvider } from './Context';

import Header from "./header/Header";
import HeaderLower from './header/HeaderLower'
import Footer from "./components/Footer";

import routes from './config/routes'
import AppRoutes from './components/AppRoutes'

export default function App() {

	return (
		<AuthProvider>
			<Router>
				<React.StrictMode>
					<Header />
					<HeaderLower />
					<Switch>
						{routes.map((route) => (
							<AppRoutes
								exact
								key={route.path}
								path={route.path}
								component={route.component}
								isPrivate={route.isPrivate}
							/>
						))}
					</Switch>
					<Footer />
				</React.StrictMode>
			</Router>
		</AuthProvider>
	);
}


{/* <Route exact path="/" component={ProductsMainView} />
<Route exact path="/login" component={LoginForm} />
<Route exact path="/logout" component={Logout} />
<Route exact path="/register" component={RegisterForm} />
<Route exact path="/user/profile" component={Profile} />
<Route exact path="/products/:slug" component={ProductDetail} />
<Route exact path="/olagh/search/" component={Search} />
<Route exact path="/user/cart" component={Cart} /> */}