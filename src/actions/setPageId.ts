import * as actionTypes from "./actionTypes";
import { IdType } from "../model/types";
import { IGlobalState } from "../reducers";
import { apiLoadPlacement } from "./apiLoadPlacement";

export const setPageId = (pageId: IdType) => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    const projectId = getState().project.projectId;

    try {
      const placements = await apiLoadPlacement(projectId, pageId);
      dispatch({
        type: actionTypes.SET_PLACEMENT,
        payload: placements,
      });

      dispatch({
        type: actionTypes.SET_PAGE_ID,
        payload: pageId,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};
