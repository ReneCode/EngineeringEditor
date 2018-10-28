import * as actionTypes from "./actionTypes";

export const mouseDown = pt => {
  return {
    type: actionTypes.MOUSE_DOWN,
    payload: pt,
  };
};
export const mouseUp = pt => {
  return {
    type: actionTypes.MOUSE_UP,
    payload: pt,
  };
};

export const mouseMove = pt => {
  return {
    type: actionTypes.MOUSE_MOVE,
    payload: pt,
  };
};
