import Placement from "../model/Placement";

import * as actionTypes from "./actionTypes";
import apiAddPlacement from "./apiAddPlacement";
import { IGlobalState } from "../reducers";
import { apiRemovePlacement } from "./apiRemovePlacement";

/*
  add the given placement to the current project/page
  into apiServer and the store
*/
export const addPlacement = (placement: Placement): any => {
  return async (
    dispatch: any,
    getState: () => IGlobalState,
  ): Promise<any> => {
    try {
      placement.projectId = getState().project.projectId;
      placement.pageId = getState().project.pageId;

      const newPlacement = await apiAddPlacement(placement);

      const action = {
        type: actionTypes.ADD_PLACEMENT,
        payload: newPlacement,
      };
      await dispatch(action);

      console.log("addPlacement:", newPlacement);

      return newPlacement;
    } catch (ex) {
      console.log("EX:", ex);
    }
  };
};

export const removePlacement = (
  placement: Placement | Placement[],
): any => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    try {
      if (!Array.isArray(placement)) {
        placement = [placement];
      }

      await apiRemovePlacement(placement);
      dispatch({
        type: actionTypes.REMOVE_PLACEMENT,
        payload: placement,
      });
    } catch (ex) {
      console.log("EX:", ex);
    }
  };
};
