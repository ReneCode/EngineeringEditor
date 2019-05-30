import Paper from "paper";
import * as actionTypes from "../actions/actionTypes";
import Placement from "../model/Placement";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { IAction } from "../actions/action";
import { makeArray } from "../model/dtoUtil";
import containsWithSameId from "../utils/containsWithSameId";

export interface IGraphicState {
  symbols: GraphicSymbol[];
  redrawn: number;
  items: Placement[];
  selectedPlacementIds: string[];
  tempItems: Placement[];
  cursor: {
    pt: Paper.Point;
  };
  viewport: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  canvas: {
    width: number;
    height: number;
    gridX: number;
    gridY: number;
    useGrid: boolean;
  };
}

const initialState: IGraphicState = {
  redrawn: 0,
  symbols: [],
  items: [],
  selectedPlacementIds: [],
  tempItems: [],
  cursor: {
    pt: new Paper.Point(0, 0),
  },
  viewport: {
    x: -500,
    y: 200,
    width: 1000,
    height: 1000,
  },
  canvas: {
    width: 100,
    height: 100,
    gridX: 4,
    gridY: 4,
    useGrid: true,
  },
};

/*
  remove placements from 
    .items
    .selectedItems
*/
const deletePlacement = (state: IGraphicState, action: IAction) => {
  if (!Array.isArray(action.payload)) {
    throw new Error("payload has to be array of placements");
  }
  const placements: Placement[] = action.payload;
  const items = state.items.filter(
    i => !containsWithSameId(placements, i),
  );
  const placementIds = placements.map(p => p.id);
  const selectedPlacementIds = state.selectedPlacementIds.filter(
    id => !placementIds.includes(id),
  );

  return {
    ...state,
    items,
    selectedPlacementIds,
  };
};

const setPlacement = (state: IGraphicState, action: any) => {
  let items: Placement[] = makeArray(action.payload).map(p => p);

  return {
    ...state,
    items: items,
    selectedItems: [],
  };
};

function updatePlacements(state: IGraphicState, action: any) {
  let placements: Placement[] = action.payload;

  const items = state.items.map(placement => {
    const newPlacement = placements.find(p => p.id === placement.id);
    if (newPlacement) {
      return newPlacement;
    } else {
      return placement;
    }
  });
  return {
    ...state,
    items: items,
  };
}

/*
  delete .items with .layer in action.payload
*/
const deleteLayer = (state: IGraphicState, action: any) => {
  let layer = makeArray(action.payload);
  const itemsToDelete = state.items.filter((item: Placement) =>
    layer.includes(item.layer),
  );
  return deletePlacement(state, { type: "", payload: itemsToDelete });
};

function addPlacement(state: IGraphicState, action: IAction) {
  const items = state.items.concat(action.payload);
  return {
    ...state,
    items: items,
  };
}

const graphicReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.REDRAWN: {
      return {
        ...state,
        redrawn: state.redrawn + 1,
      };
    }
    case actionTypes.SET_SELECTED_PLACEMENT_IDS:
      return {
        ...state,
        selectedPlacementIds: action.payload,
      };

    case actionTypes.USE_GRID:
      return {
        ...state,
        canvas: {
          ...state.canvas,
          useGrid: action.payload,
        },
      };

    case actionTypes.DELETE_LAYER:
      return deleteLayer(state, action);

    case actionTypes.SET_PLACEMENT:
      return setPlacement(state, action);

    case actionTypes.ADD_SYMBOL:
      return {
        ...state,
        symbols: state.symbols.concat(action.payload),
      };
    case actionTypes.SET_SYMBOLS:
      return {
        ...state,
        symbols: action.payload,
      };
    case actionTypes.SET_TEMP_ITEM:
      return {
        ...state,
        tempItems: [].concat(action.payload ? action.payload : []),
      };

    case actionTypes.ADD_PLACEMENT:
      return addPlacement(state, action);

    case actionTypes.DELETE_PLACEMENT:
      return deletePlacement(state, action);

    case actionTypes.UPDATE_PLACEMENT:
      return updatePlacements(state, action);

    case actionTypes.SET_CANVAS_SIZE:
      return {
        ...state,
        canvas: {
          ...state.canvas,
          width: action.payload.width,
          height: action.payload.height,
        },
      };

    case actionTypes.SET_VIEWPORT:
      return {
        ...state,
        viewport: {
          ...state.viewport,
          x: action.payload.x,
          y: action.payload.y,
          width: action.payload.width,
          height: action.payload.height,
        },
      };

    case actionTypes.SET_CURSOR_POINT:
      return {
        ...state,
        cursor: {
          ...state.cursor,
          pt: action.payload,
        },
      };

    default:
      return state;
  }
};

export default graphicReducer;
