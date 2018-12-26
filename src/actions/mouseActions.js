import * as actionTypes from "./actionTypes";

export const setCursorMode = mode => {
  return {
    type: actionTypes.SET_CURSOR_MODE,
    payload: mode,
  };
};
