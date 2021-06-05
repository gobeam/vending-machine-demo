/*
 *
 * App actions
 *
 */

import { CHANGE_FIELD } from "containers/App/constants";

export function changeAppFieldAction(key, val) {
  return {
    type: CHANGE_FIELD,
    key,
    val,
  };
}
