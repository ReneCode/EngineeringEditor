import { select, call, put, all } from "redux-saga/effects";

import getUrl from "../common/getUrl";
import * as actions from "../actions";
import ItemList from "../model/ItemList";
import ItemFactory from "../model/ItemFactory";

function* setPageIdSaga(action) {
  // load the graphic of the active page
  const pageId = action.payload;
  const url = getUrl("graphics") + `?pageId=${pageId}`;
  const result = yield fetch(url);
  const json = yield result.json();
  const jsonList = {
    type: "list",
    items: json,
  };
  const itemList = ItemList.fromJSON(jsonList);
  yield put(actions.setGraphicItems(itemList.items));
  yield put(actions.zoomFull());
}

function* saveGraphicItemSaga(action) {
  try {
    const item = action.payload;

    // add store
    yield put(actions.addGraphicItem(item));

    // save to database
    const projectId = yield select(state => state.project.projectId);
    const pageId = yield select(state => state.project.pageId);
    const saveItem = {
      ...item,
      pageId,
      projectId,
    };

    const url = getUrl("graphics");
    const result = yield call(fetch, url, {
      method: "POST",
      body: JSON.stringify(saveItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = yield result.json();
    const newItem = ItemFactory.fromJson(json);
    // remote tmp-item
    yield put(actions.removeGraphicItem(item));
    // newItem has .id
    yield put(actions.addGraphicItem(newItem));
  } catch (err) {}
}

function* loadPagesSaga(action) {
  try {
    const projectId = action.payload;
    const url = `${getUrl("pages")}?projectId=${projectId}`;
    const result = yield call(fetch, url);
    const json = yield result.json();
    yield put(actions.setPages(json));
  } catch (err) {}
}

function* createPageSaga(action) {
  try {
    const { projectId, page, callback } = action.payload;
    // TODO should do the backend on POST /pages/<projectId>
    page.projectId = projectId;
    const url = getUrl("pages");
    const res = yield call(fetch, url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    });
    const newPage = yield res.json();

    // update store
    yield put(actions.addPage(newPage));
    if (callback) {
      callback(newPage);
    }
  } catch (err) {}
}

function* apiChangeGraphicItem(items) {
  const baseUrl = getUrl("graphics");
  const calls = items.map(item => {
    const url = `${baseUrl}/${item.id}`;
    return call(fetch, url, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  yield all(calls);
}

export {
  apiChangeGraphicItem,
  setPageIdSaga,
  saveGraphicItemSaga,
  loadPagesSaga,
  createPageSaga,
};
