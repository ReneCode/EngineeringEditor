import * as actionTypes from "./actionTypes";

export const mouseDown = event => {
  return {
    type: actionTypes.MOUSE_DOWN,
    event,
  };
};
export const mouseUp = event => {
  return {
    type: actionTypes.MOUSE_UP,
    event,
  };
};

export const mouseMove = (x, y) => {
  return {
    type: actionTypes.MOUSE_MOVE,
    payload: {
      x,
      y,
    },
  };
};
