import Placement from "../model/Placement";

import * as actionTypes from "./actionTypes";
import { IGlobalState } from "../reducers";
import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";
import apiCreatePlacements from "../common/api/apiCreatePlacement";
import apiDeletePlacements from "../common/api/apiDeletePlacements";
import apiUpdatePlacement from "../common/api/apiUpdatePlacement";
import updateAutoconnection from "./updateAutoconnection";
import { makeArray } from "../model/dtoUtil";
import { updateAllSymbolRef } from "../model/updateSymbolRef";
import { GetGlobalStateFunction, LayerType } from "../model/types";
import { IAction } from "./action";
import deepClone from "../common/deepClone";

export const deleteLayerAction = (payload: LayerType): IAction => {
  return {
    type: actionTypes.DELETE_LAYER,
    payload: payload,
  };
};

/*
  add the given placement to the current project/page
  into apiServer and the store
*/
export const createPlacementAction = (
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
        p.projectId = p.projectId || projectId;
        p.pageId = p.pageId || pageId;
        return p;
      });

      const newPlacements = await apiCreatePlacements(placements);

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

export const updatePlacementAction = (
  placement: Placement | Placement[],
): any => {
  return async (
    dispatch: any,
    getState: GetGlobalStateFunction,
  ): Promise<any> => {
    placement = makeArray(placement);
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
      placement = makeArray(placement);

      await apiDeletePlacements(placement);
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
