/*
 *
 * App reducer
 *
 */
import produce, {setAutoFreeze} from 'immer';
import {LOCATION_CHANGE} from 'connected-react-router';

export const initialState = {
	isLoading: false,
	errors: {},
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = produce((draft, action) => {
	switch (action.type) {
		case LOCATION_CHANGE:
			draft.isLoading = false;
			break;
		default:
	}
}, initialState);

export default appPageReducer;
