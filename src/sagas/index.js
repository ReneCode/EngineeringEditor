import { all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { createLineSaga } from "../sagas/createLineSaga";

function* rootSagas() {
  yield all([takeLatest(actionTypes.CREATE_LINE, createLineSaga)]);
}

export default rootSagas;
