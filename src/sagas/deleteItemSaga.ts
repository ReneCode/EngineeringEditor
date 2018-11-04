import {
  put,
  select,
  all,
  call,
  cancelled,
} from "redux-saga/effects";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import getUrl from "../common/getUrl";
import ItemBase from "../model/ItemBase";

import { pickItemsSaga } from "./pickItemsSaga";
import { IA_DELETE_ITEM } from "../actions/interactionTypes";

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

    const baseUrl = getUrl("graphics");
    const calls = itemsToDelete.map((item: ItemBase) => {
      const url = `${baseUrl}/${item.id}`;
      return call(fetch, url, {
        method: "DELETE",
      });
    });
    yield all(calls);

    yield put(actions.startInteraction(IA_DELETE_ITEM));
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.setCursorMode());
    }
  }
}

export { deleteItemSaga };
