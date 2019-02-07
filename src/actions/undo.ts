import { IGlobalState } from "../reducers";
import {
  UNDO_REDO_ADD_START_MARKER,
  UNDO_REDO_ADD,
  UNDO_REDO_SET_INDEX,
} from "./actionTypes";
import { RefType } from "./createElement";
import {
  UndoRedoEntry,
  UndoRedoListType,
} from "../reducers/undoRedoReducer";
import { deletePlacementAction } from "./placementActions";

export const undoRedoAddStartMarkerCommit = () => {
  return {
    type: UNDO_REDO_ADD_START_MARKER,
  };
};

export const undoRedoAddCommit = (
  ref: RefType,
  oldData: any,
  newData: any,
): { type: string; payload: UndoRedoEntry } => {
  return {
    type: UNDO_REDO_ADD,
    payload: {
      ref,
      oldData,
      newData,
    },
  };
};

export const undoAction = () => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    try {
      const undoRedo = getState().undoredo;
      if (!undoRedo.canUndo) {
        return false;
      }

      let index = undoRedo.currentIndex;
      while (index >= 0 && undoRedo.urList[index] != "START") {
        const urEntry = undoRedo.urList[index];
        await dispatch(undoEntryAction(urEntry));
        index--;
      }
      if (undoRedo.urList[index] !== "START") {
        throw new Error("bad undo list");
      }
      index--;
      await dispatch({
        type: UNDO_REDO_SET_INDEX,
        payload: index,
      });
    } catch (execption) {
      console.log(execption);
    }
  };
};

export const redoAction = () => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    try {
    } catch (execption) {
      console.log(execption);
    }
  };
};

export const undoEntryAction = (entry: UndoRedoListType) => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    if (entry === "START") {
      throw new Error("bad call undoEntryAction");
    }

    if (!entry.oldData) {
      // undo 'create' => remove
      dispatch(deletePlacementAction(entry.newData));
    }
  };
};
