import Placement from "../model/Placement";

import * as actionTypes from "./actionTypes";
import apiCreatePlacement from "./apiCreatePlacement";
import { IGlobalState } from "../reducers";
import { apiDeletePlacement } from "./apiDeletePlacement";
import { updateAllSymbolRef } from "../model/updateSymbolRef";
import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";
import apiUpdatePlacement from "./apiUpdatePlacement";
import { makeArray } from "../model/dtoUtil";
import updateAutoconnection from "./updateAutoconnection";
import { GetGlobalStateFunction, LayerType } from "../model/types";
import { Action } from "./action";

export const deleteLayerAction = (payload: LayerType): Action => {
  return {
    type: actionTypes.DELETE_LAYER,
    payload: payload,
  };
};

/*
  add the given placement to the current project/page
  into apiServer and the store
*/
export const createPlacement = (
  payload: Placement | Placement[],
): any => {
  return async (
    dispatch: any,
    getState: () => IGlobalState,
  ): Promise<any> => {
    try {
      let placements = makeArray(payload);

      const projectId = getState().project.projectId;
      const pageId = getState().project.pageId;
      placements = placements.map(p => {
        p.projectId = projectId;
        p.pageId = pageId;
        return p;
      });

      const newPlacements = await apiCreatePlacement(placements);

      // on new symbolref we have to update the .symbol property of the symbolref
      const newSymbolRefs = newPlacements.filter(
        (p: Placement) => p instanceof GraphicSymbolRef,
      );
      if (newSymbolRefs.length > 0) {
        const symbols = getState().graphic.symbols;
        updateAllSymbolRef(newPlacements, symbols);
      }

      const action = {
        type: actionTypes.ADD_PLACEMENT,
        payload: newPlacements,
      };
      await dispatch(action);

      await updateAutoconnection(dispatch, getState);

      return newPlacements;
    } catch (ex) {
      console.log("EX:", ex);
    }
  };
};

export const updatePlacement = (
  placement: Placement | Placement[],
): any => {
  return async (
    dispatch: any,
    getState: GetGlobalStateFunction,
  ): Promise<any> => {
    if (!Array.isArray(placement)) {
      placement = [placement];
    }
    await apiUpdatePlacement(placement);

    await dispatch({
      type: actionTypes.UPDATE_PLACEMENT,
      payload: placement,
    });

    await updateAutoconnection(dispatch, getState);

    try {
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const deletePlacementAction = (
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
      await dispatch({
        type: actionTypes.DELETE_PLACEMENT,
        payload: placement,
      });

      await updateAutoconnection(dispatch, getState);
    } catch (ex) {
      console.log("EX:", ex);
    }
  };
};
