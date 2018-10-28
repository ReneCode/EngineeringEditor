import * as actionTypes from "./actionTypes";

export const addGraphicItem = item => {
  return {
    type: actionTypes.ADD_GRAPHIC_ITEM,
    payload: item,
  };
};
