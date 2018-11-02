import {
  put,
  select,
  all,
  call,
  cancelled,
} from "redux-saga/effects";

import * as actions from "../actions";
import getUrl from "../common/getUrl";
import ItemBase from "../model/ItemBase";

function* deleteItemSaga() {
  try {
    const dynamicItems = yield select(
      (state: any) => state.graphic.dynamicItems,
    );

    if (dynamicItems.length > 0) {
      yield put(actions.removeGraphicItem(dynamicItems));
      yield put(actions.removeDynamicItem(dynamicItems));

      const baseUrl = getUrl("graphics");
      const calls = dynamicItems.map((item: ItemBase) => {
        const url = `${baseUrl}/${item.id}`;
        return call(fetch, url, {
          method: "DELETE",
        });
      });
      yield all(calls);
    }
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.setCursorMode());
    }
  }
}

export { deleteItemSaga };
