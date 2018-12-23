import * as actionTypes from "../actions/actionTypes";
import Point from "../common/point";
import Placement from "../model/Placement";
import GraphicSymbol from "../model/graphic/GraphicSymbol";

export interface IGraphicState {
  symbols: GraphicSymbol[];
  items: Placement[];
  selectedItems: Placement[];
  tempItems: Placement[];
  cursor: {
    pt: Point;
    radiusScreen: number;
    mode: string;
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
  symbols: [],
  items: [],
  selectedItems: [],
  tempItems: [],
  cursor: {
    pt: new Point(0, 0),
    radiusScreen: 10,
    mode: "",
  },
  viewport: {
    x: -500,
    y: -500,
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

const removeSelectedItems = (state: IGraphicState, action: any) => {
  let selectedItems;
  if (Array.isArray(action.payload)) {
    selectedItems = state.selectedItems.filter(
      i => !action.payload.includes(i),
    );
  } else {
    selectedItems = state.selectedItems.filter(
      i => i !== action.payload,
    );
  }
  return {
    ...state,
    selectedItems,
  };
};

/*
  remove placements from 
    .items
    .selectedItems
*/
const removePlacement = (state: IGraphicState, action: any) => {
  if (!Array.isArray(action.payload)) {
    throw new Error("payload has to be array of placements");
  }
  const items = state.items.filter(i => !action.payload.includes(i));
  const selectedItems = state.selectedItems.filter(
    i => !action.payload.includes(i),
  );

  return {
    ...state,
    items,
    selectedItems,
  };
};

// deprecated
const removeItem = (state: IGraphicState, action: any) => {
  let items;
  if (Array.isArray(action.payload)) {
    items = state.items.filter(i => !action.payload.includes(i));
  } else {
    items = state.items.filter(i => i !== action.payload);
  }
  return {
    ...state,
    items,
  };
};

const addSelectedItem = (state: IGraphicState, action: any) => {
  let newItems = action.payload;
  if (!Array.isArray(newItems)) {
    newItems = [newItems];
  }
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
  let newItems = action.payload;
  if (!Array.isArray(newItems)) {
    newItems = [newItems];
  }
  return {
    ...state,
    items: [].concat(newItems),
  };
};

const updatePlacements = (state: IGraphicState, action: any) => {
  let placements = action.payload;
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
  };
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

    case actionTypes.SET_GRAPHIC_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case actionTypes.ADD_PLACEMENT:
      return {
        ...state,
        items: state.items.concat(action.payload),
      };

    case actionTypes.REMOVE_PLACEMENT:
      return removePlacement(state, action);

    case actionTypes.REMOVE_ITEM:
      return removeItem(state, action);

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

    case actionTypes.ADD_SELECTED_ITEM:
      return addSelectedItem(state, action);

    case actionTypes.REMOVE_SELECTED_ITEM:
      return removeSelectedItems(state, action);

    case actionTypes.MOUSE_MOVE:
      return {
        ...state,
        cursor: {
          ...state.cursor,
          pt: action.payload,
        },
      };
    case actionTypes.SET_CURSOR_MODE:
      return {
        ...state,
        cursor: {
          ...state.cursor,
          mode: action.payload,
        },
      };

    default:
      return state;
  }
};

export default graphicReducer;
