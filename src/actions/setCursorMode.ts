import * as actionTypes from "./actionTypes";
import { IAction } from "./action";

export const setCursorModeAction = (mode: string = ""): IAction => {
  return {
    type: actionTypes.SET_CURSOR_MODE,
    payload: mode,
  };
};
