import { Button, Card, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addOrderAction } from "containers/VendingMachine/actions";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [stock, setStock] = useState(0);
  const buyProduct = (productId) => dispatch(addOrderAction(productId));

  useEffect(() => {
    if (product.order) {
      let initialStock = product.stock;
      for (const order of product.order) {
        if (order.status === "paid") {
          initialStock -= order.quantity;
        }
      }
      setStock(initialStock);
    }
  }, [product.order]);

  return (
    <Col lg={6} md={4}>
      <Card>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            Price: NPR {product.price}
            <br />
            Stock:
            {stock > 0
              ? `${stock} ${stock > 1 ? "items" : "item"} available`
              : "Out of stock"}
          </Card.Text>
          <Button
            variant="primary"
            disabled={stock < 1}
            onClick={() => buyProduct(product._id)}
          >
            Buy
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
