import { select, call, put, all } from "redux-saga/effects";

import * as actions from "../actions";
import ItemBase from "../model/ItemBase";
import { graphql } from "../common/graphql-api";
import Placement from "../model/Placement";
import GraphicBase from "../model/graphic/GraphicBase";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import DtoElement from "../model/graphic/DtoElement";
import { IdType } from "../model/types";
import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";
import { selectGraphicSymbols } from "../reducers/selectors";

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

      const symbols = yield selectGraphicSymbols();
      updateSymbolRef(placements, symbols);
    }
    return placements;
  } catch (ex) {
    console.log("EX:", ex);
    return [];
  }
}

const updateSymbolRef = (
  placements: Placement[],
  symbols: Array<GraphicSymbol>,
): Placement[] => {
  const newPlacements: Placement[] = <Placement[]>placements.map(
    p => {
      if (p.graphic && p.graphic.type === "symbolref") {
        const symbolRef = <GraphicSymbolRef>p.graphic;
        const symbol = symbols.find(s => s.name === symbolRef.name);
        if (symbol) {
          symbolRef.symbol = symbol;
        }
      } else {
        return p;
      }
    },
  );
  return newPlacements;
};

function* apiSaveSymbolSaga(symbol: GraphicSymbol) {
  try {
    // save to database

    let mutation = `mutation createElement($input: CreateElementInput!) {
      createElement(input: $input) { projectId id name type content }
    }`;
    const dto = symbol.toDTO();
    let variables = {
      input: {
        projectId: dto.projectId,
        type: dto.type,
        name: dto.name,
        content: dto.content,
      },
    };
    const data = yield graphql(mutation, variables);
    const newSymbol = GraphicSymbol.fromDTO(data.createElement);
    return newSymbol;
  } catch (ex) {
    console.log(ex);
  }
}

function* apiLoadSymbols(projectId: IdType) {
  try {
    const query = `query Q($projectId: ID!) {
      project(id: $projectId) {
        elements { projectId id name type content }
      }
    }`;
    const variables = {
      projectId,
    };
    const data = yield graphql(query, variables);
    const dtoElements = data.project.elements;
    const symbols = dtoElements.map((e: DtoElement) => {
      return GraphicSymbol.fromDTO(e);
    });
    yield put(actions.setSymbols(symbols));
  } catch (ex) {
    console.log(ex);
  }
}

// -> Placement
function* apiCreatePlacementSaga(graphic: GraphicBase) {
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

function* apiUpdatePlacementSaga(placements: Placement[]) {
  const mutation = `mutation updatePlacements($input: [UpdatePlacementInput]!) {
    updatePlacements(input: $input) 
  }`;
  const variables = {
    input: placements.map((placement: Placement) => {
      const json: any = placement.toJSON();
      return {
        projectId: placement.projectId,
        pageId: placement.pageId,
        id: placement.id,
        graphic: json.graphic,
      };
    }),
  };
  yield graphql(mutation, variables);
}

function* apiDeletePlacementsSaga(items: Placement[]) {
  if (!Array.isArray(items)) {
    items = [items];
  }

  const mutation = `mutation M($input: [DeletePlacementInput]!) {
    deletePlacements(input: $input)
  }`;
  let variables = {
    input: items.map((i: Placement) => {
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

    // update store
    yield put(actions.addPage(newPage));
    if (callback) {
      callback(newPage);
    }
  } catch (err) {}
}

export {
  apiUpdatePlacementSaga,
  apiSaveSymbolSaga,
  setPageIdSaga,
  apiCreatePlacementSaga,
  apiLoadSymbols,
  loadPagesSaga,
  createPageSaga,
  apiDeletePlacementsSaga,
};
