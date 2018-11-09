import * as actionTypes from "../actions/actionTypes";
import Point from "../common/point";
import ItemBase from "../model/ItemBase";
import ItemSymbol from "../model/ItemSymbol";

interface IGraphicState {
  symbols: ItemSymbol[];
  items: ItemBase[];
  selectedItems: ItemBase[];
  tempItems: ItemBase[];
  cursor: object;
  viewport: object;
  canvas: object;
}

const initialState: IGraphicState = {
  symbols: [],
  items: [],
  selectedItems: [],
  tempItems: [],
  cursor: {
    pt: new Point(0, 0),
    radiusScreen: 20,
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
    gridX: 20,
    gridY: 20,
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

const removeGraphicItem = (state: IGraphicState, action: any) => {
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
    (i: ItemBase) => state.selectedItems.indexOf(i) < 0,
  );
  return {
    ...state,
    selectedItems: state.selectedItems.concat(newItems),
  };
};

const changeGraphicItem = (state: IGraphicState, action: any) => {
  let newItems = action.payload;
  if (!Array.isArray(newItems)) {
    newItems = [newItems];
  }
  return {
    ...state,
    items: state.items.map(currentItem => {
      const newItem = newItems.find(
        (i: ItemBase) => i.id === currentItem.id,
      );
      if (newItem) {
        return newItem;
      } else {
        return currentItem;
      }
    }),
  };
};

const graphicReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_SYMBOL:
      return {
        ...state,
        symbols: state.symbols.concat(action.payload),
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

    case actionTypes.ADD_GRAPHIC_ITEM:
      // if (!action.payload instanceof ItemBase) {
      //   throw new Error("bad item:" + action.payload);
      // }
      return {
        ...state,
        items: state.items.concat(action.payload),
      };
    case actionTypes.REMOVE_GRAPHIC_ITEM:
      return removeGraphicItem(state, action);

    case actionTypes.CHANGE_GRAPHIC_ITEM:
      return changeGraphicItem(state, action);

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
