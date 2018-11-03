import * as actionTypes from "../actions/actionTypes";
import ItemLine from "../model/ItemLine";
import Point from "../common/point";
import ItemBase from "../model/ItemBase";

// interface IState {
//   item: ItemBase[],
//   dynamicItems: ItemBase[],
//   cursor:  object,
//   viewport: object,
//   canvas: object
// }
const initialState = {
  items: [new ItemLine(null, new Point(0, 0), new Point(250, 200))],
  dynamicItems: [],
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

const removeDynamicItems = (state, action) => {
  let dynamicItems;
  if (Array.isArray(action.payload)) {
    dynamicItems = state.dynamicItems.filter(
      i => !action.payload.includes(i),
    );
  } else {
    dynamicItems = state.dynamicItems.filter(
      i => i !== action.payload,
    );
  }
  return {
    ...state,
    dynamicItems,
  };
};

const removeGraphicItem = (state, action) => {
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

const addDynamicItem = (state, action) => {
  let newItems = action.payload;
  if (!Array.isArray(newItems)) {
    newItems = [newItems];
  }
  // remove items, that are allready in state.dynamicItems
  newItems = newItems.filter(i => !state.dynamicItems.includes(i));
  return {
    ...state,
    dynamicItems: state.dynamicItems.concat(newItems),
  };
};

const changeGraphicItem = (state, action) => {
  let newItems = action.payload;
  if (!Array.isArray(newItems)) {
    newItems = [newItems];
  }
  return {
    ...state,
    items: state.items.map(currentItem => {
      // debugger;
      const newItem = newItems.find(i => i.id == currentItem.id);
      if (newItem) {
        return newItem;
      } else {
        return currentItem;
      }
    }),
  };
};

const graphicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GRAPHIC_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case actionTypes.ADD_GRAPHIC_ITEM:
      if (!action.payload instanceof ItemBase) {
        throw new Error("bad item:" + action.payload);
      }
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

    case actionTypes.CLEAR_DYNAMIC_ITEMS:
      return {
        ...state,
        dynamicItems: [],
      };

    case actionTypes.ADD_DYNAMIC_ITEM:
      return addDynamicItem(state, action);

    case actionTypes.REMOVE_DYNAMIC_ITEM:
      return removeDynamicItems(state, action);

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
