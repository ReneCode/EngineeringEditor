import * as actionTypes from "./actionTypes";
import { ModalId } from "../model/types";

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
