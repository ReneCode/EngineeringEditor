import * as actionTypes from "./actionTypes";

export const saveGraphicItem = item => {
  return {
    type: actionTypes.SAVE_GRAPHIC_ITEM,
    payload: item,
  };
};

export const setCanvasSize = (width, height) => {
  return {
    type: actionTypes.SET_CANVAS_SIZE,
    payload: {
      width,
      height,
    },
  };
};

export const setViewport = (x, y, width, height) => {
  return {
    type: actionTypes.SET_VIEWPORT,
    payload: {
      x,
      y,
      width,
      height,
    },
  };
};

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

export const removeGraphicItem = item => {
  return {
    type: actionTypes.REMOVE_GRAPHIC_ITEM,
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
