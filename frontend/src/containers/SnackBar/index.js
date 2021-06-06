/**
 *
 * Notifier
 *
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "containers/SnackBar/reducer";
import { useInjectSaga } from "utils/injectSaga";
import saga from "containers/SnackBar/saga";
import { createStructuredSelector } from "reselect";
import {
  makeIdSelector,
  makeSnackBarMessageAutoHideSelector,
  makeSnackBarMessageSelector,
  makeSnackBarMessageShowSelector,
  makeSnackBarMessageTypeSelector,
} from "containers/SnackBar/selectors";
import {
  clearSnackbarAction,
  removeProcessSnackbarAction,
} from "containers/SnackBar/actions";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

const key = "snackMessage";

const stateSelector = createStructuredSelector({
  message: makeSnackBarMessageSelector(),
  show: makeSnackBarMessageShowSelector(),
  type: makeSnackBarMessageTypeSelector(),
  autoHide: makeSnackBarMessageAutoHideSelector(),
  id: makeIdSelector(),
});

export default function SnackBar() {
  const dispatch = useDispatch();

  const clear = () => dispatch(clearSnackbarAction());
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return faCheckCircle;
      case "danger":
      case "warning":
        return faExclamationTriangle;
      default:
        return faInfo;
    }
  };
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const autoDismiss = () => dispatch(removeProcessSnackbarAction());
  const { message, show, type, autoHide, id } = useSelector(stateSelector);
  useEffect(() => {
    if (message !== "" && autoHide) {
      autoDismiss();
    }
  }, [message]);

  if (!show) {
    return <></>;
  }

  return (
    <Alert key={id} variant={type} onClose={clear} dismissible>
      <Alert.Heading>
        <FontAwesomeIcon icon={getIcon(type)} />{" "}
        <strong className="me-auto ms-2 text-capitalize">{type}</strong>
      </Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}
