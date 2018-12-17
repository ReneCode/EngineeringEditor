import { select, put, call } from "redux-saga/effects";
import ItemGroup from "../model/ItemGroup";
import * as actions from "../actions";
import { apiDeletePlacementsSaga } from "./apiSaga";
import { addGraphicItemSaga } from "./addGraphicItemSaga";

function* createGroupSaga() {
  const items = yield select(
    (state: any) => state.graphic.selectedItems,
  );
  // if (items.length === 0) {
  //   return;
  // }

  // const group = new ItemGroup("");
  // group.items = items;

  // yield put(actions.clearSelectedItem());

  // yield call(apiDeletePlacementsSaga, items);
  // yield put(actions.removeGraphicItem(items));

  // // save to database
  // yield addGraphicItemSaga(group);
}

export { createGroupSaga };
