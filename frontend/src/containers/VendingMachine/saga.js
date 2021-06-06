import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  CREATE_CUSTOMER,
  QUERY_PRODUCTS,
  QUERY_VENDING_MACHINE,
} from "containers/VendingMachine/constants";
import ApiEndpoint from "utils/api";
import {
  assignProductsAction,
  assignVendingMachineAction,
  asyncEndAction,
  asyncStartAction,
  enterValidationErrorAction,
} from "containers/VendingMachine/actions";
import request from "utils/request";
import uuid from "react-uuid";
import { makeCustomerBalanceSelector } from "containers/VendingMachine/selectors";

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
  if (balance < 1) {
    return yield put(
      enterValidationErrorAction({ balance: "invalid balance provided" })
    );
  }
  const api = new ApiEndpoint();
  yield put(asyncStartAction());
  const requestURL = `${api.getBasePath()}/customers`;
  const payload = api.makeApiPayload("POST", {
    token: uuid(),
    balance,
  });
  try {
    const response = yield call(request, requestURL, payload);
    return yield put(assignProductsAction(response));
  } catch (error) {
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
      return yield put(assignVendingMachineAction(response));
    }
  } catch (error) {
    return yield put(asyncEndAction());
  }
}

export default function* vendingMachineSaga() {
  yield takeLatest(QUERY_VENDING_MACHINE, handleQueryVendingMachine);
  yield takeLatest(QUERY_PRODUCTS, handleQueryProducts);
  yield takeLatest(CREATE_CUSTOMER, handleCreateCustomer);
}
