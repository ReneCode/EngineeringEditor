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

export const cudElementAction = (
  ref: RefType,
  cud: {
    create?: Placement | Placement[];
    update?: Placement | Placement[];
    delete?: Placement | Placement[];
  },
) => {
  if (!cud || (!cud.create && !cud.delete && !cud.update)) {
    return Promise.resolve();
  }

  return async (
    dispatch: any,
    getState: GetGlobalStateFunction,
  ): Promise<any> => {
    try {
      await dispatch(undoRedoAddStartMarkerCommit());

      if (cud.create) {
        const elements: Placement[] = makeArray(cud.create);
        await dispatch(createPlacementAction(elements));
        await dispatch(undoRedoAddCommit(ref, null, elements));
      }

      if (cud.delete) {
        const elements: Placement[] = makeArray(cud.delete);

        const oldPlacements = (getState() as IGlobalState).graphic.items.filter(
          i => containsWithSameId(elements, i),
        );
        await dispatch(undoRedoAddCommit(ref, oldPlacements, null));
        await dispatch(deletePlacementAction(elements));
      }

      if (cud.update) {
        const elements: Placement[] = makeArray(cud.update);
        const oldPlacements = (getState() as IGlobalState).graphic.items.filter(
          i => containsWithSameId(elements, i),
        );
        await dispatch(
          undoRedoAddCommit(ref, oldPlacements, elements),
        );
        await dispatch(updatePlacementAction(elements));
      }
    } catch (ex) {
      console.error(ex);
    }
  };
};

export const createElementAction = (
  ref: RefType,
  element: Placement | Placement[],
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
