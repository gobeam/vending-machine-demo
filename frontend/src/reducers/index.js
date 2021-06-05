import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "utils/history";
import globalReducer from 'containers/App/reducer';

export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    global: globalReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
}
