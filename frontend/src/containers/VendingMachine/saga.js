import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  ADD_ORDER,
  CREATE_CUSTOMER,
  QUERY_CUSTOMER_EXPENSE,
  QUERY_CUSTOMER_ORDERS,
  QUERY_PRODUCTS,
  QUERY_VENDING_BALANCE,
  QUERY_VENDING_MACHINE,
  REFUND_ORDER_ACTION,
} from "containers/VendingMachine/constants";
import ApiEndpoint from "utils/api";
import {
  assignCustomerAction,
  assignCustomerExpense,
  assignCustomerOrderAction,
  assignProductsAction,
  assignVendingBalanceAction,
  assignVendingMachineAction,
  asyncEndAction,
  asyncStartAction,
  changeFieldAction,
  enterValidationErrorAction,
  queryCustomerExpense,
  queryCustomerOrderAction,
  queryProductsAction,
  queryVendingBalance,
} from "containers/VendingMachine/actions";
import request from "utils/request";
import uuid from "react-uuid";
import {
  makeCustomerBalanceSelector,
  makeCustomerSelector,
  makeVendingMachineSelector,
} from "containers/VendingMachine/selectors";
import { enqueueSnackbarAction } from "containers/SnackBar/actions";

export function* handleQueryProducts() {
  const api = new ApiEndpoint();
  yield put(asyncStartAction());
  const requestURL = `${api.getBasePath()}/products`;
  const payload = api.makeApiPayload("GET");
  try {
    const response = yield call(request, requestURL, payload);
    return yield put(assignProductsAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleCreateCustomer() {
  const balance = yield select(makeCustomerBalanceSelector());
  const customer = yield select(makeCustomerSelector());
  if (balance < 1) {
    return yield put(
      enterValidationErrorAction({ balance: "invalid balance provided" })
    );
  }
  const api = new ApiEndpoint();
  yield put(asyncStartAction());
  const requestURL = `${api.getBasePath()}/customers${customer._id ? "/"+customer._id : ''}`;
  let requestPayload = {
    balance,
  };
  if (!customer._id) {
    requestPayload.token = uuid();
  }
  const payload = api.makeApiPayload(
    customer._id ? "PATCH" : "POST",
    requestPayload
  );
  try {
    const response = yield call(request, requestURL, payload);
    yield put(assignCustomerAction(response));
    yield put(changeFieldAction("balance", 0));
    return yield refreshData();
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* refreshData() {
  yield put(queryCustomerExpense());
  yield put(queryProductsAction());
  yield put(queryCustomerOrderAction());
  yield put(queryVendingBalance());
}

export function* handleAddOrder(data) {
  const customer = yield select(makeCustomerSelector());
  if (!customer._id) {
    return yield put(
      enqueueSnackbarAction({
        message: "Load money first",
        type: "danger",
        autoHide: true,
      })
    );
  }
  const vendingMachine = yield select(makeVendingMachineSelector());
  const api = new ApiEndpoint();
  yield put(asyncStartAction());
  const requestURL = `${api.getBasePath()}/orders`;
  const payload = api.makeApiPayload("POST", {
    quantity: "1",
    paymentType: "coin",
    product: data.id,
    customer: customer._id,
    vendingMachine: vendingMachine._id,
  });
  try {
    const response = yield call(request, requestURL, payload);

    if (response.error) {
      return yield put(
        enqueueSnackbarAction({
          message: response.message,
          type: "danger",
          autoHide: false,
        })
      );
    }
    if (response) {
      yield refreshData();
      return yield put(
        enqueueSnackbarAction({
          message: "Order successful",
          type: "success",
          autoHide: true,
        })
      );
    }
    // return yield put(assignCustomerAction(response));
  } catch (error) {
    yield put(
      enqueueSnackbarAction({
        message: "internal error try again later",
        type: "danger",
        autoHide: true,
      })
    );
    return yield put(asyncEndAction());
  }
}

export function* handleVendingBalanceQuery() {
  const vend = yield select(makeVendingMachineSelector());
  const api = new ApiEndpoint();
  yield put(asyncStartAction());
  const requestURL = `${api.getBasePath()}/balance/${vend._id}/vending-machine`;
  const payload = api.makeApiPayload("GET");
  try {
    const response = yield call(request, requestURL, payload);
    // assigning first vending machine for demo
    return yield put(assignVendingBalanceAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleRefundOrderAction(data) {
  const api = new ApiEndpoint();
  yield put(asyncStartAction());
  const requestURL = `${api.getBasePath()}/orders/${data.id}/refund`;
  const payload = api.makeApiPayload("PATCH", {});
  try {
    yield call(request, requestURL, payload);
    yield refreshData();
    yield put(
      enqueueSnackbarAction({
        message: "Item refunded successfully",
        type: "success",
        autoHide: true,
      })
    );
  } catch (error) {
    yield put(
      enqueueSnackbarAction({
        message: "Error during refund",
        type: "danger",
        autoHide: true,
      })
    );
    return yield put(asyncEndAction());
  }
}

export function* handleQueryVendingMachine() {
  const api = new ApiEndpoint();
  yield put(asyncStartAction());
  const requestURL = `${api.getBasePath()}/vending-machine`;
  const payload = api.makeApiPayload("GET");
  try {
    const response = yield call(request, requestURL, payload);
    // assigning first vending machine for demo
    if (response && response[0]) {
      yield put(assignVendingMachineAction(response[0]));
      return yield put(queryVendingBalance());
    }
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleQueryCustomerOrders() {
  const customer = yield select(makeCustomerSelector());
  const api = new ApiEndpoint();
  yield put(asyncStartAction());
  const requestURL = `${api.getBasePath()}/orders/${customer._id}/customer`;
  const payload = api.makeApiPayload("GET");
  try {
    const response = yield call(request, requestURL, payload);
    return yield put(assignCustomerOrderAction(response));
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export function* handleQueryCustomerExpense() {
  const customer = yield select(makeCustomerSelector());
  const api = new ApiEndpoint();
  yield put(asyncStartAction());
  const requestURL = `${api.getBasePath()}/orders/${
    customer._id
  }/customer-expense`;
  const payload = api.makeApiPayload("GET");
  try {
    const response = yield call(request, requestURL, payload);
    // assigning first vending machine for demo
    if (response) {
      return yield put(assignCustomerExpense(response));
    }
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* vendingMachineSaga() {
  yield takeLatest(QUERY_VENDING_MACHINE, handleQueryVendingMachine);
  yield takeLatest(QUERY_PRODUCTS, handleQueryProducts);
  yield takeLatest(CREATE_CUSTOMER, handleCreateCustomer);
  yield takeLatest(QUERY_VENDING_BALANCE, handleVendingBalanceQuery);
  yield takeLatest(ADD_ORDER, handleAddOrder);
  yield takeLatest(QUERY_CUSTOMER_EXPENSE, handleQueryCustomerExpense);
  yield takeLatest(QUERY_CUSTOMER_ORDERS, handleQueryCustomerOrders);
  yield takeLatest(REFUND_ORDER_ACTION, handleRefundOrderAction);
}
