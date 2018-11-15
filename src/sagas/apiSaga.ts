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
  const items = yield apiLoadPlacement(pageId);
  yield put(actions.setGraphicItems(items));
  yield put(actions.zoomFull());
}

function* apiLoadPlacement(pageId: string) {
  try {
    const projectId = yield select(
      (state: any) => state.project.projectId,
    );
    let items: ItemBase[] = [];
    if (projectId && pageId) {
      const query: string = `query placements($projectId: ID!, $pageId: ID!) {
        placements(projectId:$projectId, pageId:$pageId) { id pageId projectId type content }
      }`;
      const variables = {
        projectId,
        pageId,
      };
      const result = yield graphql(query, variables);
      const json = result.placements;
      items = <ItemBase[]>ItemFactory.fromJSON(json);
    }
    return items;
  } catch (ex) {
    console.log("EX:", ex);
    return [];
  }
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

    const json: any = item.toJSON(true);
    const query = `mutation createPlacement($input: CreatePlacementInput!) {
      createPlacement(input: $input) { id, projectId, pageId, type, content }
    }`;
    const variables = {
      input: {
        projectId,
        pageId,
        type: item.type,
        content: json.content,
      },
    };
    const result = yield graphql(query, variables);
    const newItem = ItemFactory.fromJSON(result.createPlacement);
    return newItem;
  } catch (err) {}
}

function* apiChangeGraphicItem(action: any) {
  let items = action.payload;
  if (!Array.isArray(items)) {
    items = [items];
  }

  const query = `mutation updatePlacements($input: [UpdatePlacementInput]!) {
    updatePlacements(input: $input) 
  }`;
  const variables = {
    input: items.map((i: ItemBase) => {
      const json: any = i.toJSON(true);
      return {
        projectId: i.projectId,
        pageId: i.pageId,
        id: i.id,
        content: json.content,
      };
    }),
  };
  yield graphql(query, variables);
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
    const query: string = `query project($id: ID!) {
      project(id: $id) {
        pages { id name }
      }
    }`;
    const variables = {
      id: projectId,
    };
    const result = yield graphql(query, variables);
    const json = result.project.pages;
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
      mutation createPage($input: CreatePageInput!) {
        createPage(input: $input) {
          id name
        }
      }
      `;
    const variables = {
      input: {
        name: page.name,
        projectId: page.projectId,
      },
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

export {
  apiChangeGraphicItem,
  apiSaveSymbolItemSaga,
  setPageIdSaga,
  apiSaveGraphicItemSaga,
  loadPagesSaga,
  createPageSaga,
  apiDeleteGraphicItemSaga,
};
