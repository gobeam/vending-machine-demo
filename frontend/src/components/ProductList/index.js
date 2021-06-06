import {Row} from "react-bootstrap";
import React from "react";
import {makeIsLoadingSelector, makeProductsSelector,} from "containers/VendingMachine/selectors";
import {createStructuredSelector} from "reselect";
import {useSelector} from "react-redux";
import Product from "components/ProductList/Product";

const stateSelector = createStructuredSelector({
	products: makeProductsSelector(),
	isLoading: makeIsLoadingSelector(),
});

const ProductList = () => {
	const {products} = useSelector(stateSelector);
	return (
		<Row>
			{products.length < 1 ? <h5>No Product available</h5> : ""}
			{products.map((product) => (
				<Product key={product.id} product={product}/>
			))}
		</Row>
	);
};

export default ProductList;
