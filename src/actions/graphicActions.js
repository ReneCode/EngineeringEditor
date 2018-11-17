import * as actionTypes from "./actionTypes";

export const addSymbol = symbol => {
  return {
    type: actionTypes.ADD_SYMBOL,
    payload: symbol,
  };
};

export const setSymbols = symbols => {
  return {
    type: actionTypes.SET_SYMBOLS,
    payload: symbols,
  };
};

export const saveGraphicItem = item => {
  return {
    type: actionTypes.SAVE_GRAPHIC_ITEM,
    payload: item,
  };
};

export const deleteGraphicItem = item => {
  return {
    type: actionTypes.DELETE_GRAPHIC_ITEM,
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

// identify item to exchange by .id
export const changeGraphicItem = item => {
  return {
    type: actionTypes.CHANGE_GRAPHIC_ITEM,
    payload: item,
  };
};

export const addSelectedItem = item => {
  return {
    type: actionTypes.ADD_SELECTED_ITEM,
    payload: item,
  };
};

export const removeSelectedItem = item => {
  return {
    type: actionTypes.REMOVE_SELECTED_ITEM,
    payload: item,
  };
};

export const clearSelectedItem = () => {
  return {
    type: actionTypes.CLEAR_SELECTED_ITEM,
  };
};
