import * as actionTypes from "./actionTypes";
import { ModalId } from "../model/types";
import { IAction } from "./action";
import { IaEventType } from "../components/interaction/IaBase";

export const setTempItem = (item: any = undefined) => {
  return {
    type: actionTypes.SET_TEMP_ITEM,
    payload: item,
  };
};

export const addEventHandlerAction = (
  eventType: IaEventType,
  handler: any,
): IAction => {
  return {
    type: actionTypes.ADD_EVENT_HANDLER,
    payload: {
      eventType: eventType,
      handler: handler,
    },
  };
};

export const removeEventHandlerAction = (
  eventType: IaEventType,
  handler: any,
): IAction => {
  return {
    type: actionTypes.REMOVE_EVENT_HANDLER,
    payload: {
      eventType: eventType,
      handler: handler,
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
