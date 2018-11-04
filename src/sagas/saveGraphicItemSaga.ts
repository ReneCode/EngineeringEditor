import { put, call } from "redux-saga/effects";
import * as actions from "../actions";
import ItemBase from "../model/ItemBase";
import { apiSaveGraphicItemSaga } from "./apiSaga";

function* saveGraphicItemSaga(action: any) {
  const item: any = action.payload;
  if (!(item instanceof ItemBase)) {
    throw new Error("bad item:" + item);
  }
  // save tmp-item
  yield put(actions.addGraphicItem(item));
  // save to API
  const newItem = yield call(apiSaveGraphicItemSaga, item);
  // replace tmp-item with real item (has .id from api)
  yield put(actions.removeGraphicItem(item));
  yield put(actions.addGraphicItem(newItem));
}

export { saveGraphicItemSaga };
