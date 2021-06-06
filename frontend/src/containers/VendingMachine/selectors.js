import { createSelector } from 'reselect';
import { initialState } from 'containers/App/reducer';

const selectVendingMachine = (state) => state.vendingMachine || initialState;

const makeVendingMachineSelector = () =>
	createSelector(selectVendingMachine, (subState) => subState.vendingMachine);

const makeProductsSelector = () =>
	createSelector(selectVendingMachine, (subState) => subState.products);

const makeIsLoadingSelector = () =>
	createSelector(selectVendingMachine, (subState) => subState.isLoading);

const makeErrorSelector = () =>
	createSelector(selectVendingMachine, (subState) => subState.errors);

const makeCustomerBalanceSelector = () =>
	createSelector(selectVendingMachine, (subState) => subState.balance);

export {
	makeErrorSelector,
	makeCustomerBalanceSelector,
	makeProductsSelector,
	makeIsLoadingSelector,
	makeVendingMachineSelector,
};
