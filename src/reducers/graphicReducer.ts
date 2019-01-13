import * as actionTypes from "../actions/actionTypes";
import Point from "../common/point";
import Placement from "../model/Placement";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { IAction } from "../actions/action";

export interface IGraphicState {
  symbols: GraphicSymbol[];
  items: Placement[];
  selectedItems: Placement[];
  tempItems: Placement[];
  cursor: {
    // pt: Point;
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
    // pt: new Point(0, 0),
    radiusScreen: 10,
    mode: "",
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
  update the selectedItems if that id is found in the action.payload
*/
const updateSelectedItem = (state: IGraphicState, action: any) => {
  let items: Placement[] = action.payload;
  if (!Array.isArray(items)) {
    items = [items];
  }

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

const removeSelectedItem = (state: IGraphicState, action: any) => {
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
const deletePlacement = (state: IGraphicState, action: any) => {
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

const setSelectedItem = (state: IGraphicState, action: any) => {
  let newItems = action.payload;
  if (!Array.isArray(newItems)) {
    newItems = [newItems];
  }
  return {
    ...state,
    selectedItems: newItems,
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

/*
  delete .items with .layer in action.payload
*/
const deleteLayer = (state: IGraphicState, action: any) => {
  let layer: any = action.payload;
  if (!Array.isArray(layer)) {
    layer = [layer];
  }
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

    // case actionTypes.SET_GRAPHIC_ITEMS:
    //   return {
    //     ...state,
    //     items: action.payload,
    //   };

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
    case actionTypes.REMOVE_SELECTED_ITEM:
      return removeSelectedItem(state, action);
    case actionTypes.UPDATE_SELECTED_ITEM:
      return updateSelectedItem(state, action);

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
