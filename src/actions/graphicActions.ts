import * as actionTypes from "./actionTypes";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import Placement from "../model/Placement";

export const addSymbol = (symbol: GraphicSymbol) => {
  return {
    type: actionTypes.ADD_SYMBOL,
    payload: symbol,
  };
};

export const setCanvasSize = (width: number, height: number) => {
  return {
    type: actionTypes.SET_CANVAS_SIZE,
    payload: {
      width,
      height,
    },
  };
};

export const setViewport = (
  x: number,
  y: number,
  width: number,
  height: number,
) => {
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

export const addSelectedItem = (item: Placement | Placement[]) => {
  return {
    type: actionTypes.ADD_SELECTED_ITEM,
    payload: item,
  };
};

export const removeSelectedItem = (item: Placement | Placement[]) => {
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
