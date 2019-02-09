import * as actionTypes from "./actionTypes";
import { GetGlobalStateFunction } from "../model/types";
import {
  undoRedoAddStartMarkerCommit,
  undoRedoAddCommit,
} from "./undo";
import apiCreatePlacements from "../common/api/apiCreatePlacement";
import Placement from "../model/Placement";
import {
  createPlacementAction,
  deletePlacementAction,
} from "./placementActions";
import { makeArray } from "../model/dtoUtil";
import { containsWithSameId } from "../reducers/graphicReducer";

interface Element {
  ref: string;
  data: any;
}

export type RefType = "placement";
export type ElementType = Placement | Placement[];

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
      console.log(ex);
    }
  };
};

export const removeElementAction = (
  ref: RefType,
  element: ElementType,
) => {
  return async (dispatch: any, getState: GetGlobalStateFunction) => {
    try {
      const elements: Placement[] = makeArray(element);

      const oldPlacements = getState().graphic.items.filter(i =>
        containsWithSameId(elements, i),
      );
      await dispatch(undoRedoAddStartMarkerCommit());
      await dispatch(undoRedoAddCommit(ref, oldPlacements, null));
      await dispatch(deletePlacementAction(elements));
    } catch (ex) {
      console.log(ex);
    }
  };
};
