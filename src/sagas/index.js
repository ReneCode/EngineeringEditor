import { all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  loadPagesSaga,
  createPageSaga,
  setPageIdSaga,
  apiLoadSymbols,
} from "../sagas/apiSaga";
import { startInteractionSaga } from "./startInteractionSaga";

function* rootSagas() {
  yield all([
    takeLatest(actionTypes.START_INTERACTION, startInteractionSaga),
    takeLatest(actionTypes.LOAD_PAGES, loadPagesSaga),
    takeLatest(actionTypes.CREATE_PAGE, createPageSaga),
    takeLatest(actionTypes.SET_PAGE_ID, setPageIdSaga),
    takeLatest(actionTypes.SET_PROJECT_ID, action =>
      apiLoadSymbols(action.payload),
    ),
  ]);
}

export default rootSagas;
