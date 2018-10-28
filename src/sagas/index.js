import { all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { createLineSaga } from "../sagas/createLineSaga";
import {
  loadGraphicSaga,
  saveGraphicItemSaga,
} from "../sagas/apiSaga";

function* rootSagas() {
  yield all([
    takeLatest(actionTypes.CREATE_LINE, createLineSaga),
    takeLatest(actionTypes.LOAD_GRAPHIC, loadGraphicSaga),
    takeLatest(actionTypes.SAVE_GRAPHIC_ITEM, saveGraphicItemSaga),
  ]);
}

export default rootSagas;
