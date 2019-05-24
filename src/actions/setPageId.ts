import * as actionTypes from "./actionTypes";
import { IdType } from "../model/types";
import { IGlobalState } from "../reducers";
import apiLoadPlacement from "../common/api/apiLoadPlacement";
import { updateAllSymbolRef } from "../model/updateSymbolRef";

const setPageId = (projectId: IdType, pageId: IdType) => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    if (!projectId) {
      throw new Error("projectId missing on setPageId");
    }
    try {
      const placements = await apiLoadPlacement(projectId, pageId);

      const symbols = getState().graphic.symbols;
      updateAllSymbolRef(placements, symbols);

      await dispatch({
        type: actionTypes.SET_PLACEMENT,
        payload: placements,
      });

      // await updateAutoconnection(dispatch, getState);

      await dispatch({
        type: actionTypes.SET_PAGE_ID,
        payload: pageId,
      });

      /*
      if (pageId) {
        // get the pageId specific viewport
        // if there is no viewport for this page start with full-screen
        const vp = (getState().project.pageViewports as any)[pageId];
        if (vp) {
          await dispatch(
            setViewportAction(vp.x, vp.y, vp.width, vp.height),
          );
        } else {
          await dispatch(zoomFullAction());
        }
      }
       */
    } catch (ex) {
      console.log(ex);
    }
  };
};
export default setPageId;
