import { put, call, cancelled } from "redux-saga/effects";

import * as actions from "../actions";
import { pickItemsSaga } from "./pickItemsSaga";
import { IA_SELECT } from "../actions/interactionTypes";

function* selectSaga() {
  try {
    const selectedItems = yield call(pickItemsSaga, "select");
    if (selectedItems.length === 0) {
      yield put(actions.clearDynamicItems());
    } else {
      yield put(actions.addDynamicItem(selectedItems));
    }

    yield put(actions.startInteraction(IA_SELECT));
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.setCursorMode());
    }
  }
}

export { selectSaga };
