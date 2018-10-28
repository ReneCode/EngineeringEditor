import * as actionTypes from "./actionTypes";
import ItemLine from "../model/ItemLine";

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

export const createLine = () => {
  return { type: actionTypes.CREATE_LINE };
};
