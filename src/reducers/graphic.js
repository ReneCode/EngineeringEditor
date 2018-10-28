import * as actionTypes from "../actions/actionTypes";
import ItemLine from "../model/ItemLine";
import ItemCircle from "../model/ItemCircle";

const initialState = {
  items: [
    new ItemLine(20, 40, 200, 150),
    new ItemCircle(120, 140, 30),
  ],
  dynamicItems: [new ItemCircle(0, 0, 80)],
  cursor: {
    x: 0,
    y: 0,
  },
  canvas: {
    width: 0,
    height: 0,
  },
};

const graphicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_GRAPHIC_ITEM:
      return {
        ...state,
        items: state.items.concat(action.payload),
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

    case actionTypes.MOUSE_MOVE:
      return {
        ...state,
        cursor: {
          x: action.payload.x,
          y: action.payload.y,
        },
      };

    default:
      return state;
  }
};

export default graphicReducer;
