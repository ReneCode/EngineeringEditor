import { select, call, put, all } from "redux-saga/effects";

import getUrl from "../common/getUrl";
import * as actions from "../actions";
import ItemFactory from "../model/ItemFactory";
import ItemBase from "../model/ItemBase";
import ItemSymbol from "../model/ItemSymbol";
import { graphql } from "../common/graphql-api";

function* setPageIdSaga(action: any) {
  // load the graphic of the active page
  const pageId = action.payload;
  const url = getUrl("graphics") + `?pageId=${pageId}`;
  const result = yield fetch(url);
  const json = yield result.json();
  const items = ItemFactory.fromJSON(json);
  yield put(actions.setGraphicItems(items));
  yield put(actions.zoomFull());
}

function* apiSaveSymbolItemSaga(symbol: ItemSymbol) {
  try {
    // save to database
    const projectId = yield select(
      (state: any) => state.project.projectId,
    );
    const saveItem = {
      ...symbol,
      projectId,
    };
    const url = getUrl("symbols");
    const result = yield call(fetch, url, {
      method: "POST",
      body: JSON.stringify(saveItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = yield result.json();
    const newSymbol = ItemFactory.fromJSON(json);
    return newSymbol;
  } catch (ex) {
    console.log(ex);
  }
}

function* apiSaveGraphicItemSaga(item: ItemBase) {
  try {
    if (!(item instanceof ItemBase)) {
      throw new Error("bad item:" + item);
    }

    // save to database
    const projectId = yield select(
      (state: any) => state.project.projectId,
    );
    const pageId = yield select((state: any) => state.project.pageId);
    item.pageId = pageId;
    item.projectId = projectId;

    const url = getUrl("graphics");
    const result = yield call(fetch, url, {
      method: "POST",
      body: JSON.stringify(item.toJSON()),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = yield result.json();
    const newItem = ItemFactory.fromJSON(json);
    return newItem;
  } catch (err) {}
}

function* apiDeleteGraphicItemSaga(items: ItemBase[]) {
  if (!Array.isArray(items)) {
    items = [items];
  }
  const baseUrl = getUrl("graphics");
  const calls = items.map((item: ItemBase) => {
    const url = `${baseUrl}/${item.id}`;
    return call(fetch, url, {
      method: "DELETE",
    });
  });
  yield all(calls);
}

function* loadPagesSaga(action: any) {
  try {
    const projectId = action.payload;
    const query: string = `{
      pages(projectId:"${projectId}") { id name }
    }`;
    const result = yield graphql(query);
    // const url = `${getUrl("pages")}?projectId=${projectId}`;
    // const result = yield call(fetch, url);
    // const json = yield result.json();
    const json = result.pages;
    yield put(actions.setPages(json));
  } catch (ex) {
    console.log("---------");
    console.log(ex);
  }
}

function* createPageSaga(action: any) {
  try {
    const { projectId, page, callback } = action.payload;
    // TODO should do the backend on POST /pages/<projectId>
    page.projectId = projectId;

    const mutation: string = `
      mutation createPage($projectId: String!, $name: String!) {
        createPage(projectId: $projectId, name: $name) {
          id name
        }
      }
      `;
    const variables = {
      name: page.name,
      projectId: page.projectId,
    };
    const result = yield graphql(mutation, variables);
    const newPage = result.createPage;

    // const url = getUrl("pages");
    // const res = yield call(fetch, url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(page),
    // });
    // const newPage = yield res.json();

    // update store
    yield put(actions.addPage(newPage));
    if (callback) {
      callback(newPage);
    }
  } catch (err) {}
}

function* apiChangeGraphicItem(action: any) {
  let items = action.payload;
  if (!Array.isArray(items)) {
    items = [items];
  }
  const baseUrl = getUrl("graphics");
  const calls = items.map((item: ItemBase) => {
    const url = `${baseUrl}/${item.id}`;
    return call(fetch, url, {
      method: "PUT",
      body: JSON.stringify(item.toJSON()),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  yield all(calls);
}

export {
  apiChangeGraphicItem,
  apiSaveSymbolItemSaga,
  setPageIdSaga,
  apiSaveGraphicItemSaga,
  loadPagesSaga,
  createPageSaga,
  apiDeleteGraphicItemSaga,
};
