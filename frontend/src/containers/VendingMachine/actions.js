/*
 *
 * Vending Machine actions
 *
 */

import {
  ASSIGN_PRODUCTS,
  ASSIGN_CUSTOMER,
  ASSIGN_VENDING_MACHINE,
  QUERY_PRODUCTS,
  QUERY_VENDING_MACHINE,
  ASYNC_END,
  ASYNC_START,
  VALIDATE_FORM,
  CHANGE_FORM_FIELD,
  CREATE_CUSTOMER,
  QUERY_VENDING_BALANCE,
  SUBMIT_FORM,
  ASSIGN_VENDING_BALANCE,
  ADD_ORDER,
  QUERY_CUSTOMER_EXPENSE,
  ASSIGN_CUSTOMER_EXPENSE,
  QUERY_CUSTOMER_ORDERS,
  ASSIGN_CUSTOMER_ORDERS, REFUND_ORDER_ACTION,
} from "containers/VendingMachine/constants";
import { ADD_VALIDATION_ERROR } from "containers/VendingMachine/constants";

export function queryVendingMachineAction() {
  return {
    type: QUERY_VENDING_MACHINE,
  };
}
export function refundOrderAction(id) {
  return {
    type: REFUND_ORDER_ACTION,
    id
  };
}

export function queryCustomerExpense() {
  return {
    type: QUERY_CUSTOMER_EXPENSE,
  };
}

export function queryCustomerOrderAction() {
  return {
    type: QUERY_CUSTOMER_ORDERS,
  };
}

export function assignCustomerOrderAction(data) {
  return {
    type: ASSIGN_CUSTOMER_ORDERS,
    data
  };
}

export function addOrderAction(id) {
  return {
    type: ADD_ORDER,
    id,
  };
}

export function assignCustomerExpense(data) {
  return {
    type: ASSIGN_CUSTOMER_EXPENSE,
    data,
  };
}

export function queryVendingBalance() {
  return {
    type: QUERY_VENDING_BALANCE,
  };
}

export function createNewCustomerAction() {
  return {
    type: CREATE_CUSTOMER,
  };
}

export function assignVendingMachineAction(data) {
  return {
    type: ASSIGN_VENDING_MACHINE,
    data,
  };
}
export function assignVendingBalanceAction(data) {
  return {
    type: ASSIGN_VENDING_BALANCE,
    data,
  };
}

export function queryProductsAction() {
  return {
    type: QUERY_PRODUCTS,
  };
}

export function assignProductsAction(data) {
  return {
    type: ASSIGN_PRODUCTS,
    data,
  };
}

export function assignCustomerAction(data) {
  return {
    type: ASSIGN_CUSTOMER,
    data,
  };
}

export function asyncStartAction() {
  return {
    type: ASYNC_START,
  };
}

export function asyncEndAction() {
  return {
    type: ASYNC_END,
  };
}

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}

export function validateFormAction() {
  return {
    type: VALIDATE_FORM,
  };
}

export function submitFormAction() {
  return {
    type: SUBMIT_FORM,
  };
}

export function changeFieldAction(key, value) {
  return {
    type: CHANGE_FORM_FIELD,
    key,
    value,
  };
}
