import * as actionTypes from "./actionTypes";

export const setCursorModeAction = mode => {
  return {
    type: actionTypes.SET_CURSOR_MODE,
    payload: mode,
  };
};
