/*
 *
 * VendingMachine reducer
 *
 */
import produce from "immer";
import { LOCATION_CHANGE } from "connected-react-router";
import {
  ADD_VALIDATION_ERROR,
  ASSIGN_PRODUCTS,
  ASSIGN_VENDING_MACHINE,
  CHANGE_FORM_FIELD,
} from "containers/VendingMachine/constants";

export const initialState = {
  vendingMachine: {},
  balance: 0,
  products: [],
  errors: {},
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const vendingMachineReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_FORM_FIELD:
      draft[action.key] = action.value;
      draft.errors[action.key] = "";
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      draft.isLoading = false;
      break;
    case ASSIGN_VENDING_MACHINE:
      draft.vendingMachine = action.data;
      draft.isLoading = false;
      break;
    case ASSIGN_PRODUCTS:
      draft.products = action.data;
      draft.isLoading = false;
      break;
    case LOCATION_CHANGE:
      draft.isLoading = false;
      draft.errors = {};
      break;
  }
}, initialState);

export default vendingMachineReducer;
