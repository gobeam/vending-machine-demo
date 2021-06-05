/*
 *
 * App reducer
 *
 */
import produce, {setAutoFreeze} from 'immer';

import {CHANGE_FIELD,} from 'containers/App/constants';
import {LOCATION_CHANGE} from 'connected-react-router';

export const initialState = {
	isLoading: false,
	isLogged: null,
	errors: {},
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = produce((draft, action) => {
	switch (action.type) {
		case CHANGE_FIELD:
			draft[action.key] = action.val;
			draft.errors[action.key] = '';
			draft.isLoading = false;
			break;
		case LOCATION_CHANGE:
			draft.isLoading = false;
			draft.takeItEasy = '';
			draft.limit = 1;
			draft.userMenu = false;
			draft.hideHeader = false;
			draft.userNotification = false;
			break;
		default:
	}
}, initialState);

export default appPageReducer;
