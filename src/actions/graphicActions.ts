import * as actionTypes from "./actionTypes";
import GraphicSymbol from "../model/graphic/GraphicSymbol";

export const setSelectedPlacementIds = (ids: string[]) => {
  return {
    type: actionTypes.SET_SELECTED_PLACEMENT_IDS,
    payload: ids,
  };
};

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

export const setViewportAction = (
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
