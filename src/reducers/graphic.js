import * as actionTypes from "../actions/actionTypes";
import ItemLine from "../model/ItemLine";
import Point from "../common/point";

const initialState = {
  items: [new ItemLine(null, new Point(0, 0), new Point(250, 200))],
  dynamicItems: [],
  cursor: {
    x: 0,
    y: 0,
  },
  viewport: {
    x: -500,
    y: -500,
    width: 1000,
    height: 1000,
  },
  transform: {},
  canvas: {
    width: 100,
    height: 100,
    gridX: 20,
    gridY: 20,
  },
};

const graphicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GRAPHIC_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case actionTypes.ADD_GRAPHIC_ITEM:
      return {
        ...state,
        items: state.items.concat(action.payload),
      };
    case actionTypes.REMOVE_GRAPHIC_ITEM:
      return {
        ...state,
        items: state.items.filter(i => i !== action.payload),
      };

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

    case actionTypes.ADD_DYNAMIC_ITEM:
      return {
        ...state,
        dynamicItems: state.dynamicItems.concat(action.payload),
      };

    case actionTypes.REMOVE_DYNAMIC_ITEM:
      return {
        ...state,
        dynamicItems: state.dynamicItems.filter(
          i => i !== action.payload,
        ),
      };

    case actionTypes.MOUSE_MOVE:
      return {
        ...state,
        cursor: action.payload,
      };

    default:
      return state;
  }
};

export default graphicReducer;
