import { call } from "redux-saga/effects";

import { createLineSaga } from "../sagas/createLineSaga";
import { createCircleSaga } from "../sagas/createCircleSaga";
import * as IaTypes from "../actions/interactionTypes";
import { zoomWindowSaga } from "./zoomSaga";
import { selectSaga } from "./selectSaga";

function* startInteractionSaga(action) {
  const iaType = action.payload;
  switch (iaType) {
    case IaTypes.IA_CREATE_CIRCLE:
      yield call(createCircleSaga);
      break;

    case IaTypes.IA_CREATE_LINE:
      yield call(createLineSaga);
      break;

    case IaTypes.IA_ZOOM_WINDOW:
      yield call(zoomWindowSaga);
      break;
    case IaTypes.IA_SELECT:
      yield call(selectSaga);
      break;

    default:
      throw new Error(`bad interaction: ${iaType}`);
  }
}

export { startInteractionSaga };
