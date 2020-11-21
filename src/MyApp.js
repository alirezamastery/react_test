import React, { useEffect, useState } from 'react';
import './App.css';
import PostLoadingComponent from './components/PostLoading';
import {ProductsList} from './products/components'

function MyApp() {
	const ProductLoading = PostLoadingComponent(ProductsList);
	const [appState, setAppState] = useState({
		loading: false,
		products: null,
	});

	useEffect(() => {
		setAppState({ loading: true });
		const apiUrl = `http://127.0.0.1:8000/api/products/`;
		fetch(apiUrl)
			.then((data) => data.json())
			.then((products) => {
				setAppState({ loading: false, products: products });
			});
	}, [setAppState]);
	return (
		<div className="App">
			<h1>آخرین محصولات</h1>
			<ProductLoading isLoading={appState.loading} posts={appState.products} />
		</div>
	);
}
export default MyApp;