import * as actionTypes from "./actionTypes";
import { ModalId } from "../model/types";

export const setTempItem = (item: any = undefined) => {
  return {
    type: actionTypes.SET_TEMP_ITEM,
    payload: item,
  };
};

export const showModal = (id: ModalId) => {
  return {
    type: actionTypes.SHOW_MODAL,
    payload: id,
  };
};

export const useGrid = (useGrid: boolean) => {
  return {
    type: actionTypes.USE_GRID,
    payload: useGrid,
  };
};
