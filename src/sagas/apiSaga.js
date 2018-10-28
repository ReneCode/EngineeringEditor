import { select, put, cancel, cancelled } from "redux-saga/effects";

import getUrl from "../common/getUrl";
import * as actions from "../actions";

function* loadGraphicSaga(action) {
  const pageId = action.payload;
  const url = getUrl("graphics") + `?pageId=${pageId}`;
  const result = yield fetch(url);
  const json = yield result.json();
  yield put(actions.setGraphicItems(json));
}

function* saveGraphicItemSaga(action) {
  try {
    const item = action.payload;

    // set store
    yield put(actions.addGraphicItem(item));

    // save to database
    const page = yield select(state => state.project.page);
    const saveItem = {
      ...item,
      pageId: page.id,
    };

    const url = getUrl("graphics");
    const result = yield fetch(url, {
      method: "POST",
      body: JSON.stringify(saveItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = yield result.json();
  } catch (err) {}
}

export { loadGraphicSaga, saveGraphicItemSaga };
