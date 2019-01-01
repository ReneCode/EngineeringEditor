import * as actionTypes from "./actionTypes";
import { IdType } from "../model/types";
import { IGlobalState } from "../reducers";
import { apiLoadPlacementAction } from "./apiLoadPlacement";
import { updateAllSymbolRef } from "../model/updateSymbolRef";
import { clearSelectedItem } from "./graphicActions";
import updateAutoconnection from "./updateAutoconnection";

const setPageId = (projectId: IdType, pageId: IdType) => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    if (!projectId) {
      throw new Error("projectId missing on setPageId");
    }
    try {
      dispatch(clearSelectedItem());

      const placements = await apiLoadPlacementAction(
        projectId,
        pageId,
      );

      const symbols = getState().graphic.symbols;
      updateAllSymbolRef(placements, symbols);

      await dispatch({
        type: actionTypes.SET_PLACEMENT,
        payload: placements,
      });

      await updateAutoconnection(dispatch, getState);

      await dispatch({
        type: actionTypes.SET_PAGE_ID,
        payload: pageId,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};
export default setPageId;
