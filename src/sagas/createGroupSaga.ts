import { select, put } from "redux-saga/effects";
import ItemGroup from "../model/ItemGroup";
import * as actions from "../actions";

function* createGroupSaga() {
  const items = yield select(
    (state: any) => state.graphic.selectedItems,
  );
  if (items.length === 0) {
    return;
  }

  const group = new ItemGroup("");
  group.items = items;

  yield put(actions.saveGraphicItem(group));
}

export { createGroupSaga };
