import Placement from "../model/Placement";

import * as actionTypes from "./actionTypes";
import apiCreatePlacement from "./apiCreatePlacement";
import { IGlobalState } from "../reducers";
import { apiDeletePlacement } from "./apiDeletePlacement";

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

export const deletePlacement = (
  placement: Placement | Placement[],
): any => {
  return async (
    dispatch: any,
    getState: () => IGlobalState,
  ): Promise<any> => {
    try {
      console.log("ABC");
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
