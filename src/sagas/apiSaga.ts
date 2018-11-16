import { select, call, put, all } from "redux-saga/effects";

import getUrl from "../common/getUrl";
import * as actions from "../actions";
import ItemFactory from "../model/ItemFactory";
import ItemBase from "../model/ItemBase";
import ItemSymbol from "../model/ItemSymbol";
import { graphql } from "../common/graphql-api";
import Placement from "../model/Placement";
import GraphicBase from "../model/graphic/GraphicBase";

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
    let placements: Placement[] = [];
    if (projectId && pageId) {
      const query: string = `query placements($projectId: ID!, $pageId: ID!) {
        placements(projectId:$projectId, pageId:$pageId) { id pageId projectId type graphic }
      }`;
      const variables = {
        projectId,
        pageId,
      };
      const result = yield graphql(query, variables);
      const json = result.placements;
      placements = <Placement[]>Placement.fromJSON(json);
    }
    return placements;
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

// -> Placement
function* apiSaveGraphicItemSaga(graphic: GraphicBase) {
  try {
    if (!(graphic instanceof GraphicBase)) {
      throw new Error("bad graphic:" + graphic);
    }

    // save to database
    const projectId = yield select(
      (state: any) => state.project.projectId,
    );
    const pageId = yield select((state: any) => state.project.pageId);
    const placement = new Placement(projectId, pageId, graphic);
    const json: any = placement.toJSON();
    const query = `mutation createPlacement($input: CreatePlacementInput!) {
      createPlacement(input: $input) { id, projectId, pageId, type, graphic }
    }`;
    const variables = {
      input: {
        projectId,
        pageId,
        type: graphic.type,
        graphic: json.graphic,
      },
    };
    const result = yield graphql(query, variables);
    const newItem = Placement.fromJSON(result.createPlacement);
    return newItem;
  } catch (err) {}
}

function* apiChangeGraphicItem(action: any) {
  let items = action.payload;
  if (!Array.isArray(items)) {
    items = [items];
  }

  const mutation = `mutation updatePlacements($input: [UpdatePlacementInput]!) {
    updatePlacements(input: $input) 
  }`;
  const variables = {
    input: items.map((i: ItemBase) => {
      const json: any = i.toJSON(true);
      return {
        projectId: i.projectId,
        pageId: i.pageId,
        id: i.id,
        graphic: json.graphic,
      };
    }),
  };
  yield graphql(mutation, variables);
}

function* apiDeleteGraphicItemSaga(items: ItemBase[]) {
  if (!Array.isArray(items)) {
    items = [items];
  }

  const mutation = `mutation M($input: [DeletePlacementInput]!) {
    deletePlacements(input: $input)
  }`;
  let variables = {
    input: items.map((i: ItemBase) => {
      return {
        projectId: i.projectId,
        pageId: i.pageId,
        id: i.id,
      };
    }),
  };
  yield graphql(mutation, variables);
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
