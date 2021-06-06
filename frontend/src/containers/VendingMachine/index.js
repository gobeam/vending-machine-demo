/**
 *
 * VendingMachine
 *
 */
import React, { useEffect } from "react";
import { useInjectSaga } from "utils/injectSaga";
import saga from "containers/VendingMachine/saga";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
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
  makeVendingMachineBalanceSelector,
  makeErrorSelector,
  makeCustomerSelector,
  makeCustomerExpenseSelector,
  makeCustomerBalanceSelector,
} from "containers/VendingMachine/selectors";
import { createStructuredSelector } from "reselect";

const key = "vendingMachine";
const stateSelector = createStructuredSelector({
  errors: makeErrorSelector(),
  balance: makeCustomerBalanceSelector(),
  isLoading: makeIsLoadingSelector(),
  vendingBalance: makeVendingMachineBalanceSelector(),
  customer: makeCustomerSelector(),
  customerExpense: makeCustomerExpenseSelector(),
});

export default function DashboardPage() {
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const {
    errors,
    isLoading,
    vendingBalance,
    customer,
    customerExpense,
    balance,
  } = useSelector(stateSelector);

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
      <div className="product-wrap my-5">
        <Row>
          <Col md={9} sm={8}>
            <div className="product-listing">
              <h4 className="text-center mb-3 text-primary">
                Vending Machine Balance:{" "}
                <span className="pl-2">
                  NPR.{" "}
                  {vendingBalance.creditAmount - vendingBalance.debitAmount}
                </span>
              </h4>
              <div className="fixed-height">
                <ProductList />
              </div>
            </div>
          </Col>
          <Col md={3} sm={4}>
            <div className="product-listing">
              <h4 className="text-center mb-3 text-primary">Your Items</h4>
              <div className="fixed-height">
                <OrderList />
              </div>
            </div>
          </Col>
        </Row>
        <div className="calculation mt-4">
          <Form noValidate onSubmit={loadBalance}>
            <Row className="justify-content-center">
              <Col lg={4}>
                <Form.Group controlId="validationCustom03">
                  <Form.Control
                    onChange={onChangeField}
                    isInvalid={!!errors.balance}
                    type="number"
                    name="balance"
                    value={balance}
                    placeholder="Amount"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.balance}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary" disabled={isLoading}>
                  Load Balance
                </Button>
              </Col>
              <Col lg={4}>
                <Card className="p-2 total-counts">
                  <div className="d-flex item">
                    <p>Actual Balance: </p>
                    <p className="pl-2"> NPR {customer.balance}</p>
                  </div>
                  <div className="d-flex item">
                    <p>Your change: </p>
                    <p className="pl-2">
                      NPR {customer.balance - customerExpense.expenseAmount}
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Container>
  );
}
