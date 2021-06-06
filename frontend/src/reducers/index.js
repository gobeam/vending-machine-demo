import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "utils/history";
import globalReducer from 'containers/App/reducer';
import vendingMachineReducer from 'containers/VendingMachine/reducer';
import snackBarReducer from 'containers/SnackBar/reducer';

export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    global: globalReducer,
    vendingMachine: vendingMachineReducer,
    snackMessage: snackBarReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
}
