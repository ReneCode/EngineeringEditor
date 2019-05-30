import {
  GetGlobalStateFunction,
  RefType,
  ElementType,
} from "../model/types";
import {
  undoRedoAddStartMarkerCommit,
  undoRedoAddCommit,
} from "./undoRedo";
import Placement from "../model/Placement";
import {
  createPlacementAction,
  deletePlacementAction,
  updatePlacementAction,
} from "./placementActions";
import { makeArray } from "../model/dtoUtil";
import containsWithSameId from "../utils/containsWithSameId";
import { IGlobalState } from "../store/reducers";

export const createElementAction = (
  ref: RefType,
  element: Placement,
) => {
  return async (dispatch: any): Promise<any> => {
    try {
      const newPlacement = await dispatch(
        createPlacementAction(element),
      );
      await dispatch(undoRedoAddStartMarkerCommit());
      await dispatch(undoRedoAddCommit(ref, null, element));
      return newPlacement;
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const deleteElementAction = (
  ref: RefType,
  element: ElementType,
) => {
  return async (dispatch: any, getState: GetGlobalStateFunction) => {
    try {
      const elements: Placement[] = makeArray(element);

      const oldPlacements = (getState() as IGlobalState).graphic.items.filter(
        i => containsWithSameId(elements, i),
      );
      await dispatch(undoRedoAddStartMarkerCommit());
      await dispatch(undoRedoAddCommit(ref, oldPlacements, null));
      await dispatch(deletePlacementAction(elements));
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const updateElementAction = (
  ref: RefType,
  element: ElementType,
) => {
  return async (dispatch: any, getState: GetGlobalStateFunction) => {
    try {
      const elements: Placement[] = makeArray(element);
      const oldPlacements = (getState() as IGlobalState).graphic.items.filter(
        i => containsWithSameId(elements, i),
      );
      await dispatch(undoRedoAddStartMarkerCommit());
      await dispatch(undoRedoAddCommit(ref, oldPlacements, elements));
      await dispatch(updatePlacementAction(elements));
    } catch (ex) {
      console.error(ex);
    }
  };
};
