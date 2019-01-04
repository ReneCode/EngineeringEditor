import * as actionTypes from "./actionTypes";
import { IAction } from "./action";

export const setSelectedObjectType = (type: string): IAction => {
  return {
    type: actionTypes.SET_SELECTED_OBJECT_TYPE,
    payload: type,
  };
};
