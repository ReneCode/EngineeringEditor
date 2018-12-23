import * as actionTypes from "./actionTypes";
import { ModalId } from "../model/types";
export * from "./graphicActions";
export * from "./mouseActions";
export * from "./projectActions";
export * from "./zoomActions";
export * from "./apiSaveGraphicItem";
export * from "./apiRemovePlacement";
export * from "./apiUpdatePlacement";
export * from "./placementActions";
export * from "./setPageId";

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

export const useGrid = (useGrid: boolean) => {
  return {
    type: actionTypes.USE_GRID,
    payload: useGrid,
  };
};

export const setStartInteractionHandler = (handler: Function) => {
  return {
    type: actionTypes.SET_START_INTERACTION_HANDLER,
    payload: handler,
  };
};
