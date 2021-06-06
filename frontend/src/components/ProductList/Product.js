import { Button, Card, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Product = ({ product }) => {
  const [stock, setStock] = useState(0);
  useEffect(() => {
    if (product.order) {
      let initialStock = product.stock;
      for (const order of product.order) {
        switch (order.status) {
          case "paid":
            initialStock -= order.quantity;
            break;
          case "refund":
            initialStock += order.quantity;
            break;
        }
      }
      setStock(initialStock);
    }
  }, [product.order]);

  return (
    <Col lg={3} md={3} sm={12} className="m-2">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            Price: ${product.price}
            <br />
            Stock:
            {stock > 0
              ? `${stock} ${stock > 1 ? "items" : "item"} available`
              : "Out of stock"}
          </Card.Text>
          <Button variant="primary" disabled={stock < 1}>Buy</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
