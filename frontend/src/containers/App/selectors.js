import { createSelector } from 'reselect';
import { initialState } from 'containers/App/reducer';

const selectGlobal = (state) => state.global || initialState;

const selectRouter = (state) => state.router;

const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.location);

const makeIsLoadingSelector = () =>
  createSelector(selectGlobal, (globalState) => globalState.isLoading);

export {
  makeIsLoadingSelector,
  makeSelectLocation,
};
