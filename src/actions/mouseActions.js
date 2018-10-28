import * as actionTypes from "./actionTypes";

export const mouseDown = (x, y) => {
  return {
    type: actionTypes.MOUSE_DOWN,
    payload: {
      x,
      y,
    },
  };
};
export const mouseUp = (x, y) => {
  return {
    type: actionTypes.MOUSE_UP,
    payload: {
      x,
      y,
    },
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
