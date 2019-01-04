import * as actionTypes from "./actionTypes";
import { IAction } from "./action";

export const setViewObjectAction = (type: string): IAction => {
  return {
    type: actionTypes.SET_VIEW_OBJECT,
    payload: type,
  };
};
