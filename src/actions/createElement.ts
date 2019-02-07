import * as actionTypes from "./actionTypes";
import { GetGlobalStateFunction } from "../model/types";
import {
  undoRedoAddStartMarkerCommit,
  undoRedoAddCommit,
} from "./undo";
import apiCreatePlacements from "../common/api/apiCreatePlacement";
import Placement from "../model/Placement";
import { createPlacementAction } from "./placementActions";

interface Element {
  ref: string;
  data: any;
}

export type RefType = "placement";

export const dbCreateElement = (ref: RefType, element: any) => {
  return async (dispatch: any, getState: GetGlobalStateFunction) => {
    if (element instanceof Placement) {
      let placements = [element];
      const projectId = getState().project.projectId;
      const pageId = getState().project.pageId;
      placements = placements.map(p => {
        p.projectId = projectId;
        p.pageId = pageId;
        return p;
      });

      const newPlacements = await apiCreatePlacements(placements);
    }
  };
};

export const createElementAction = (
  ref: RefType,
  element: any,
): any => {
  return async (
    dispatch: any,
    getState: GetGlobalStateFunction,
  ): Promise<any> => {
    try {
      const newPlacement = await dispatch(
        createPlacementAction(element),
      );
      // await dispatch(dbCreateElement(ref, element));
      await dispatch(undoRedoAddStartMarkerCommit());
      await dispatch(undoRedoAddCommit(ref, null, newPlacement));
      return newPlacement;
    } catch (ex) {
      throw new Error("Exception:" + ex);
    }
  };
};
