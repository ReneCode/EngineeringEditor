import { select, put } from "redux-saga/effects";

import getUrl from "../common/getUrl";
import * as actions from "../actions";

function* loadGraphicSaga(action) {
  const pageId = action.payload;
  const url = getUrl("graphics") + `?pageId=${pageId}`;
  const result = yield fetch(url);
  const json = yield result.json();
  yield put(actions.setGraphicItems(json));
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
    const result = yield fetch(url, {
      method: "POST",
      body: JSON.stringify(saveItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newItem = yield result.json();
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
    const result = yield fetch(url);
    const json = yield result.json();
    yield put(actions.setPages(json));
  } catch (err) {}
}

function* createPageSaga(action) {
  try {
    const { projectId, page } = action.payload;
    // TODO should do the backend on POST /pages/<projectId>
    page.projectId = projectId;
    const url = getUrl("pages");
    const res = yield fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    });
    const newPage = yield res.json();

    // update store
    yield put(actions.addPage(newPage));
    yield put(actions.setPageId(newPage.id));
  } catch (err) {}
}

export {
  loadGraphicSaga,
  saveGraphicItemSaga,
  loadPagesSaga,
  createPageSaga,
};
