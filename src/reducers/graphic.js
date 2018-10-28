import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [
    {
      type: "line",
      x1: 20,
      y1: 40,
      x2: 200,
      y2: 150,
    },
  ],
  cursor: {},
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

    default:
      return state;
  }
};

export default graphicReducer;
