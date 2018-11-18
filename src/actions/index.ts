import * as actionTypes from "./actionTypes";
import { ModalId } from "../model/types";
export * from "./graphicActions.js";
export * from "./mouseActions.js";
export * from "./projectActions";
export * from "./zoomActions";

export const setTempItem = (item: any = undefined) => {
  return {
    type: actionTypes.SET_TEMP_ITEM,
    payload: item,
  };
};

export const startInteraction = (iaType: string, ...args: any) => {
  return {
    type: actionTypes.START_INTERACTION,
    payload: {
      type: iaType,
      args: args,
    },
  };
};

export const showModal = (id: ModalId) => {
  return {
    type: actionTypes.SHOW_MODAL,
    payload: id,
  };
};
