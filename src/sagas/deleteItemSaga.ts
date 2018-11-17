import { put, select, call, cancelled } from "redux-saga/effects";

import * as actions from "../actions";

import { pickItemsSaga } from "./pickItemsSaga";
import { IA_DELETE_ITEM } from "../actions/interactionTypes";
import { apiDeletePlacementsSaga } from "./apiSaga";

function* deleteItemSaga() {
  let itemsToDelete = [];
  try {
    const selectedItems = yield select(
      (state: any) => state.graphic.selectedItems,
    );
    if (selectedItems.length === 0) {
      const { items } = yield call(pickItemsSaga, "delete");
      itemsToDelete = items;
    } else {
      itemsToDelete = selectedItems;
    }

    yield put(actions.removeGraphicItem(itemsToDelete));
    yield put(actions.removeSelectedItem(itemsToDelete));

    yield call(apiDeletePlacementsSaga, itemsToDelete);

    yield put(actions.startInteraction(IA_DELETE_ITEM));
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.setCursorMode());
    }
  }
}

export { deleteItemSaga };
