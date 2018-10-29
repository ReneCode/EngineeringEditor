import { all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  loadGraphicSaga,
  saveGraphicItemSaga,
} from "../sagas/apiSaga";
import { startInteractionSaga } from "./startInteractionSaga";

function* rootSagas() {
  yield all([
    takeLatest(actionTypes.START_INTERACTION, startInteractionSaga),
    takeLatest(actionTypes.LOAD_GRAPHIC, loadGraphicSaga),
    takeLatest(actionTypes.SAVE_GRAPHIC_ITEM, saveGraphicItemSaga),
  ]);
}

export default rootSagas;
