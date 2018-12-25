import * as actionTypes from "./actionTypes";
import { IdType } from "../model/types";
import { IGlobalState } from "../reducers";
import { apiLoadPlacement } from "./apiLoadPlacement";
import { updatePlacementsSymbolRef } from "../sagas/updateSymbolRef";

export const setPageId = (projectId: IdType, pageId: IdType) => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    // const projectId = getState().project.projectId;
    if (!projectId) {
      throw new Error("projectId missing on setPageId");
    }
    try {
      const placements = await apiLoadPlacement(projectId, pageId);

      const symbols = getState().graphic.symbols;
      updatePlacementsSymbolRef(placements, symbols);

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
