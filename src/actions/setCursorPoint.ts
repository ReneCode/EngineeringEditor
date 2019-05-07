import * as actionTypes from "./actionTypes";
import { IAction } from "./action";
import Paper from "paper";

export const setCursorPointMutation = (pt: Paper.Point): IAction => {
  return {
    type: actionTypes.SET_CURSOR_POINT,
    payload: pt,
  };
};
