import { select } from "redux-saga/effects";

function* createGroupSaga() {
  const items = yield select(
    (state: any) => state.graphic.selectedItems,
  );
  if (items.length === 0) {
    return;
  }
}

export { createGroupSaga };
