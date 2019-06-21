import * as actionTypes from "./actionTypes";
import { ModalIdType } from "../model/types";

export const showModalAction = (id: ModalIdType) => {
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
