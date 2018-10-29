import { call } from "redux-saga/effects";

import { createLineSaga } from "../sagas/createLineSaga";
import { createCircleSaga } from "../sagas/createCircleSaga";
import {
  IA_CREATE_CIRCLE,
  IA_CREATE_LINE,
} from "../actions/interactionTypes";

function* startInteractionSaga(action) {
  const iaType = action.payload;
  switch (iaType) {
    case IA_CREATE_CIRCLE:
      yield call(createCircleSaga);
      break;

    case IA_CREATE_LINE:
      yield call(createLineSaga);
      break;

    default:
      throw new Error(`bad interaction: ${iaType}`);
  }
}

export { startInteractionSaga };
