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
	const {products, isLoading} = useSelector(stateSelector);
	return (
		<Row>
			{products.map((product) => (
				<Product key={product.id} product={product}/>
			))}
		</Row>
	);
};

export default ProductList;
