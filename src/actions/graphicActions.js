import * as actionTypes from "./actionTypes";

export const setGraphicItems = items => {
  return {
    type: actionTypes.SET_GRAPHIC_ITEMS,
    payload: items,
  };
};

export const addGraphicItem = item => {
  return {
    type: actionTypes.ADD_GRAPHIC_ITEM,
    payload: item,
  };
};

export const addDynamicItem = item => {
  return {
    type: actionTypes.ADD_DYNAMIC_ITEM,
    payload: item,
  };
};

export const removeDynamicItem = item => {
  return {
    type: actionTypes.REMOVE_DYNAMIC_ITEM,
    payload: item,
  };
};
