import * as actionTypes from "../actions/actionTypes";
import ItemLine from "../model/ItemLine";
import ItemCircle from "../model/ItemCircle";
import Point from "../common/Point";

const initialState = {
  items: [
    new ItemLine(new Point(20, 40), new Point(200, 150)),
    new ItemCircle(new Point(120, 140), 30),
  ],
  dynamicItems: [],
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

    case actionTypes.ADD_DYNAMIC_ITEM:
      return {
        ...state,
        dynamicItems: state.dynamicItems.concat(action.payload),
      };

    case actionTypes.REMOVE_DYNAMIC_ITEM:
      return {
        ...state,
        dynamicItems: state.dynamicItems.filter(
          i => i != action.payload,
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
