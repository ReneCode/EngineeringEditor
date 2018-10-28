import * as actionTypes from "./actionTypes";

export const setCanvasSize = (width, height) => {
  return {
    type: actionTypes.SET_CANVAS_SIZE,
    payload: {
      width,
      height,
    },
  };
};
