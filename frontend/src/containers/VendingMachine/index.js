/**
 *
 * VendingMachine
 *
 */
import React, { useEffect } from "react";
import { useInjectSaga } from "utils/injectSaga";
import saga from "containers/VendingMachine/saga";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ProductList from "components/ProductList";
import OrderList from "components/OrderList";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "containers/VendingMachine/reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFieldAction,
  createNewCustomerAction,
  queryProductsAction,
  queryVendingMachineAction,
} from "containers/VendingMachine/actions";
import {
  makeIsLoadingSelector,
  makeErrorSelector,
} from "containers/VendingMachine/selectors";
import { createStructuredSelector } from "reselect";

const key = "vendingMachine";
const stateSelector = createStructuredSelector({
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
});

export default function DashboardPage() {
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const { errors, isLoading } = useSelector(stateSelector);

  const loadProducts = () => dispatch(queryProductsAction());
  const loadVendingMachine = () => dispatch(queryVendingMachineAction());
  const loadBalance = (e) =>
    dispatch(createNewCustomerAction()) && e.preventDefault();
  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));

  useEffect(() => {
    loadProducts();
    loadVendingMachine();
  }, []);

  return (
    <Container>
      <Row>
        <Col md={10} sm={8}>
          <ProductList />
        </Col>
        <Col md={2} sm={4}>
          <OrderList />
        </Col>
      </Row>
      <Row>
        <Form noValidate onSubmit={loadBalance}>
          <Col>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Control
                onChange={onChangeField}
                isInvalid={!!errors.balance}
                type="number"
                name="balance"
                placeholder="Amount"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.balance}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Button type="submit" variant="primary" disabled={isLoading}>
              Load Balance
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
}
