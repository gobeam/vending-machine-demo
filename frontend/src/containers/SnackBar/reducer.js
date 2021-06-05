/*
 *
 * App reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';
import uuid from 'react-uuid';
import {
  SHOW_SNACK_BAR_MESSAGE,
  CLEAR_SNACKBAR,
} from 'containers/SnackBar/constants';

export const initialState = {
  autoHide: false,
  show: false,
  message: '',
  type: '',
  id: '',
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = produce((draft, action) => {
  switch (action.type) {
    case SHOW_SNACK_BAR_MESSAGE:
      draft.show = true;
      draft.message = action.snackbar.message;
      draft.duration = action.snackbar.duration;
      draft.type = action.snackbar.type;
      draft.autoHide = action.snackbar.autoHide;
      draft.id = uuid();
      break;
    case CLEAR_SNACKBAR:
      draft.autoHide = false;
      draft.show = false;
      draft.message = '';
      draft.duration = 0;
      draft.type = '';
      draft.id = '';
      break;
    default:
  }
}, initialState);

export default appPageReducer;
