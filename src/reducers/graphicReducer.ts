import * as actionTypes from "../actions/actionTypes";
import Point from "../common/point";
import Placement from "../model/Placement";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { IAction } from "../actions/action";
import { makeArray } from "../model/dtoUtil";
import Paper from "paper";

export interface IGraphicState {
  selectedPaperItems: Paper.Item[];
  symbols: GraphicSymbol[];
  items: Placement[];
  selectedItems: Placement[];
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
  selectedPaperItems: [],
  symbols: [],
  items: [],
  selectedItems: [],
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

export const containsWithSameId = (
  items: Placement[],
  item: Placement,
) => {
  return items.findIndex(i => i.id === item.id) >= 0;
};

/*
  update the selectedItems if that id is found in the action.payload
*/
const updateSelectedItem = (state: IGraphicState, action: any) => {
  let items: Placement[] = makeArray(action.payload);

  // const toIdObject = (acc: any, item: any)
  const idToItem = items.reduce((acc: any, item: any) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const newSelectedItems = state.selectedItems.map((item: any) => {
    const newItem = idToItem[item.id];
    if (newItem) {
      return newItem;
    } else {
      return item;
    }
  });
  return {
    ...state,
    selectedItems: newSelectedItems,
  };
};

/*
  remove placements from 
    .items
    .selectedItems
*/
const deletePlacement = (state: IGraphicState, action: any) => {
  if (!Array.isArray(action.payload)) {
    throw new Error("payload has to be array of placements");
  }
  const items = state.items.filter(
    i => !containsWithSameId(action.payload, i),
  );
  const selectedItems = state.selectedItems.filter(
    i => !containsWithSameId(action.payload, i),
  );

  return {
    ...state,
    items,
    selectedItems,
  };
};

const setSelectedItem = (state: IGraphicState, action: any) => {
  let newItems = makeArray(action.payload);
  return {
    ...state,
    selectedItems: newItems,
  };
};
const addSelectedItem = (state: IGraphicState, action: any) => {
  let newItems = makeArray(action.payload);
  // remove items, that are allready in state.selectedItems
  newItems = newItems.filter(
    (i: Placement) => state.selectedItems.indexOf(i) < 0,
  );

  return {
    ...state,
    selectedItems: state.selectedItems.concat(newItems),
  };
};

const setPlacement = (state: IGraphicState, action: any) => {
  // console.log("SET placement");
  let newItems: Placement[] = makeArray(action.payload).map(p => p);
  return {
    ...state,
    items: newItems,
    selectedItems: [],
  };
};

const updatePlacements = (state: IGraphicState, action: any) => {
  let placements = action.payload;
  let selectedItems = state.selectedItems;

  // check if selectedItems are also changed
  let updateSelectedItems = false;
  let newSelectedItems = selectedItems.map(oneSelectedItem => {
    const newPlacement = placements.find(
      (p: Placement) => p.id === oneSelectedItem.id,
    );
    if (newPlacement) {
      updateSelectedItems = true;
      return newPlacement;
    } else {
      return oneSelectedItem;
    }
  });
  if (!updateSelectedItems) {
    // no changes
    newSelectedItems = selectedItems;
  }
  // console.log("UPDATE placement");
  return {
    ...state,
    items: state.items.map(currentPlacement => {
      const newPlacement = placements.find(
        (p: Placement) => p.id === currentPlacement.id,
      );
      if (newPlacement) {
        return newPlacement;
      } else {
        return currentPlacement;
      }
    }),
    selectedItems: newSelectedItems,
  };
};

/*
  delete .items with .layer in action.payload
*/
const deleteLayer = (state: IGraphicState, action: any) => {
  let layer = makeArray(action.payload);
  const itemsToDelete = state.items.filter((item: Placement) =>
    layer.includes(item.layer),
  );
  return deletePlacement(state, { payload: itemsToDelete });
};

const graphicReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.USE_GRID: {
      return {
        ...state,
        canvas: {
          ...state.canvas,
          useGrid: action.payload,
        },
      };
    }

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
      return {
        ...state,
        items: state.items.concat(action.payload),
      };

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

    case actionTypes.CLEAR_SELECTED_ITEM:
      return {
        ...state,
        selectedItems: [],
      };

    case actionTypes.SET_SELECTED_ITEM:
      return setSelectedItem(state, action);
    case actionTypes.ADD_SELECTED_ITEM:
      return addSelectedItem(state, action);
    case actionTypes.UPDATE_SELECTED_ITEM:
      return updateSelectedItem(state, action);

    case actionTypes.SET_CURSOR_POINT:
      return {
        ...state,
        cursor: {
          ...state.cursor,
          pt: action.payload,
        },
      };

    case actionTypes.SET_SELECTED_PAPER_ITEMS:
      // console.log("change selected paper items");
      return {
        ...state,
        selectedPaperItems: action.payload,
      };

    default:
      return state;
  }
};

export default graphicReducer;
