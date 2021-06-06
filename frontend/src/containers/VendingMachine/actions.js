/*
 *
 * Vending Machine actions
 *
 */

import {
  ASSIGN_PRODUCTS,
  ASSIGN_VENDING_MACHINE,
  QUERY_PRODUCTS,
  QUERY_VENDING_MACHINE,
  ASYNC_END,
  ASYNC_START,
  VALIDATE_FORM,
  CHANGE_FORM_FIELD,
  CREATE_CUSTOMER,
  SUBMIT_FORM,
} from "containers/VendingMachine/constants";
import { ADD_VALIDATION_ERROR } from 'containers/VendingMachine/constants';

export function queryVendingMachineAction() {
  return {
    type: QUERY_VENDING_MACHINE,
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
