import { all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  saveGraphicItemSaga,
  loadPagesSaga,
  createPageSaga,
  setPageIdSaga,
} from "../sagas/apiSaga";
import { startInteractionSaga } from "./startInteractionSaga";
import { zoomWindowSaga, zoomFullSaga } from "./zoomSaga";
import { mouseMoveSaga } from "./mouseSaga";

function* rootSagas() {
  yield all([
    takeLatest(actionTypes.START_INTERACTION, startInteractionSaga),
    takeLatest(actionTypes.SAVE_GRAPHIC_ITEM, saveGraphicItemSaga),
    takeLatest(actionTypes.ZOOM_WINDOW, zoomWindowSaga),
    takeLatest(actionTypes.ZOOM_FULL, zoomFullSaga),
    takeLatest(actionTypes.LOAD_PAGES, loadPagesSaga),
    takeLatest(actionTypes.CREATE_PAGE, createPageSaga),
    takeLatest(actionTypes.SET_PAGE_ID, setPageIdSaga),
    takeLatest(actionTypes.MOUSE_MOVE, mouseMoveSaga),
  ]);
}

export default rootSagas;
