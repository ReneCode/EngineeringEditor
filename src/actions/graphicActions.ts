import * as actionTypes from "./actionTypes";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import Placement from "../model/Placement";
import { makeArray } from "../model/dtoUtil";
import GraphicGrip from "../model/graphic/GraphicGrip";
import { deleteLayerAction } from "./placementActions";

import Paper from "paper";

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

const getGripsFromPlacements = (
  items: Placement[],
): GraphicGrip[] => {
  return items.reduce((acc: GraphicGrip[], p) => {
    const myGrips = p.getGrips();
    return acc.concat(myGrips);
  }, []);
};

export const setSelectedItemAction = (
  items: Placement | Placement[],
) => {
  return async (dispatch: any) => {
    try {
      // clear old selected items
      // const action = {
      //   type: actionTypes.CLEAR_SELECTED_ITEM,
      // };
      // await dispatch(action);

      // clear the grips
      // await dispatch(deleteLayerAction("grip"));

      items = makeArray(items);
      // const grips = getGripsFromPlacements(items);
      // const actionAddGrips = {
      //   type: actionTypes.ADD_PLACEMENT,
      //   payload: grips,
      // };
      // await dispatch(actionAddGrips);

      const actionSetSelectedItems = {
        type: actionTypes.SET_SELECTED_ITEM,
        payload: items,
      };
      await dispatch(actionSetSelectedItems);
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const addSelectedItemAction = (
  items: Placement | Placement[],
) => {
  return async (dispatch: any) => {
    try {
      items = makeArray(items);

      const grips = getGripsFromPlacements(items);
      const actionAddGrips = {
        type: actionTypes.ADD_PLACEMENT,
        payload: grips,
      };
      await dispatch(actionAddGrips);

      const action = {
        type: actionTypes.ADD_SELECTED_ITEM,
        payload: items,
      };
      await dispatch(action);
    } catch (ex) {
      console.log(ex);
    }
  };
};

const clearSelectedItem = () => {
  return async (dispatch: any) => {
    try {
      await dispatch(deleteLayerAction("grip"));

      const action = {
        type: actionTypes.CLEAR_SELECTED_ITEM,
      };
      await dispatch(action);
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const updateSelectedItem = (item: Placement | Placement[]) => {
  return {
    type: actionTypes.UPDATE_SELECTED_ITEM,
    payload: item,
  };
};

export const setSelectedPaperItems = (
  items: Paper.Item | Paper.Item[],
) => {
  return {
    type: actionTypes.SET_SELECTED_PAPER_ITEMS,
    payload: makeArray(items),
  };
};
