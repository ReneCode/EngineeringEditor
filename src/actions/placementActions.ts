import Placement from "../model/Placement";

import * as actionTypes from "./actionTypes";
import apiCreatePlacement from "./apiCreatePlacement";
import { IGlobalState } from "../reducers";
import { apiDeletePlacement } from "./apiDeletePlacement";
import { updatePlacement } from "./graphicActions";
import {
  updateGraphicsSymbolRef,
  updateOneSymbolRef,
} from "../model/updateSymbolRef";
import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";

/*
  add the given placement to the current project/page
  into apiServer and the store
*/
export const createPlacement = (placement: Placement): any => {
  return async (
    dispatch: any,
    getState: () => IGlobalState,
  ): Promise<any> => {
    try {
      placement.projectId = getState().project.projectId;
      placement.pageId = getState().project.pageId;

      const newPlacement = await apiCreatePlacement(placement);

      // on new symbolref we have to update the .symbol property of the symbolref
      if (newPlacement instanceof GraphicSymbolRef) {
        const symbols = getState().graphic.symbols;
        updateOneSymbolRef(newPlacement, symbols);
      }

      const action = {
        type: actionTypes.ADD_PLACEMENT,
        payload: newPlacement,
      };
      await dispatch(action);

      return newPlacement;
    } catch (ex) {
      console.log("EX:", ex);
    }
  };
};

export const deletePlacement = (
  placement: Placement | Placement[],
): any => {
  return async (
    dispatch: any,
    getState: () => IGlobalState,
  ): Promise<any> => {
    try {
      if (!Array.isArray(placement)) {
        placement = [placement];
      }

      await apiDeletePlacement(placement);
      dispatch({
        type: actionTypes.DELETE_PLACEMENT,
        payload: placement,
      });
    } catch (ex) {
      console.log("EX:", ex);
    }
  };
};
