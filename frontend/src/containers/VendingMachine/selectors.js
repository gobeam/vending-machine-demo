import { createSelector } from "reselect";
import { initialState } from "containers/App/reducer";

const selectVendingMachine = (state) => state.vendingMachine || initialState;

const makeVendingMachineSelector = () =>
  createSelector(selectVendingMachine, (subState) => subState.vendingMachine);

const makeVendingMachineBalanceSelector = () =>
  createSelector(selectVendingMachine, (subState) => subState.vendingBalance);

const makeProductsSelector = () =>
  createSelector(selectVendingMachine, (subState) => subState.products);

const makeIsLoadingSelector = () =>
  createSelector(selectVendingMachine, (subState) => subState.isLoading);

const makeErrorSelector = () =>
  createSelector(selectVendingMachine, (subState) => subState.errors);

const makeCustomerBalanceSelector = () =>
  createSelector(selectVendingMachine, (subState) => subState.balance);

const makeCustomerSelector = () =>
  createSelector(selectVendingMachine, (subState) => subState.customer);

const makeCustomerExpenseSelector = () =>
  createSelector(selectVendingMachine, (subState) => subState.customerExpense);

const makeCustomerOrdersSelector = () =>
  createSelector(selectVendingMachine, (subState) => subState.orders);

export {
  makeCustomerOrdersSelector,
  makeCustomerExpenseSelector,
  makeCustomerSelector,
  makeVendingMachineBalanceSelector,
  makeErrorSelector,
  makeCustomerBalanceSelector,
  makeProductsSelector,
  makeIsLoadingSelector,
  makeVendingMachineSelector,
};
