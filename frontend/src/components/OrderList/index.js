import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import {
  makeCustomerOrdersSelector,
  makeIsLoadingSelector,
} from "containers/VendingMachine/selectors";
import { useDispatch, useSelector } from "react-redux";
import { refundOrderAction } from "containers/VendingMachine/actions";

const stateSelector = createStructuredSelector({
  orders: makeCustomerOrdersSelector(),
  isLoading: makeIsLoadingSelector(),
});

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(stateSelector);
  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const refundOrder = () => {
    dispatch(refundOrderAction(orderId));
    setOrderId(null);
    setShow(false);
  };

  const handleClose = () => setShow(false);

  const confirmRefund = (orderId) => {
    setOrderId(orderId);
    setShow(true);
  };

  return (
    <>
      <Row>
        {orders.length < 1 ? <h5>No Item available</h5> : ""}
        {orders.map((order) => (
          <Col lg={12} md={12}>
            <Card>
              <Card.Img variant="top" src={order.product.image} />
              <Card.Body>
                <Card.Title>{order.product.name}</Card.Title>
                <Card.Text>
                  Cost: NPR {order.amount}
                  <br />
                  Bought Quantity:
                  {order.quantity}
                </Card.Text>
                <Button
                  variant="primary"
                  disabled={isLoading}
                  onClick={() => confirmRefund(order._id)}
                >
                  Refund
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Refund</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to refund item ?!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={refundOrder}>
            Refund
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderList;
