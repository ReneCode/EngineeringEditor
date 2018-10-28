import * as actionTypes from "./actionTypes";

export const loadGraphic = pageId => {
  return {
    type: actionTypes.LOAD_GRAPHIC,
    payload: pageId,
  };
};
export const saveGraphicItem = item => {
  return {
    type: actionTypes.SAVE_GRAPHIC_ITEM,
    payload: item,
  };
};
