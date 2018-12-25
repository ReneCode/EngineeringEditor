import * as actionTypes from "./actionTypes";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import GraphicBase from "../model/graphic/GraphicBase";
import Placement from "../model/Placement";

export const addSymbol = (symbol: GraphicSymbol) => {
  return {
    type: actionTypes.ADD_SYMBOL,
    payload: symbol,
  };
};

// export const setSymbols = (symbols: GraphicSymbol[]) => {
//   return {
//     type: actionTypes.SET_SYMBOLS,
//     payload: symbols,
//   };
// };

// export const saveGraphicItem = item => {
//   return {
//     type: actionTypes.SAVE_GRAPHIC_ITEM,
//     payload: item,
//   };
// };

export const deleteGraphicItem = (item: GraphicBase) => {
  return {
    type: actionTypes.DELETE_GRAPHIC_ITEM,
    payload: item,
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

export const setGraphicItems = (items: GraphicBase[]) => {
  return {
    type: actionTypes.SET_GRAPHIC_ITEMS,
    payload: items,
  };
};

export const addItem = (item: GraphicBase | Placement) => {
  throw new Error("use addPlacement");

  // return {
  //   type: actionTypes.ADD_ITEM,
  //   payload: item,
  // };
};

export const removeItem = (item: Placement | Placement[]) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    payload: item,
  };
};

// identify placement to update by .id
export const updatePlacement = (
  placements: Placement | Placement[],
) => {
  return {
    type: actionTypes.UPDATE_PLACEMENT,
    payload: placements,
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
