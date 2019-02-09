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
import {
  deletePlacementAction,
  createPlacementAction,
} from "./placementActions";

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
      console.log("undo:", undoRedo);
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
      return true;
    } catch (execption) {
      console.log(execption);
    }
  };
};

export const redoAction = () => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    try {
      const undoRedo = getState().undoredo;
      console.log("redo:", undoRedo);
      if (!undoRedo.canRedo) {
        return false;
      }
      let index = undoRedo.currentIndex;
      index++;
      if (undoRedo.urList[index] !== "START") {
        throw new Error("bad redo list");
      }

      while (
        index + 1 < undoRedo.urList.length &&
        undoRedo.urList[index + 1] !== "START"
      ) {
        index++;
        const urEntry = undoRedo.urList[index];
        await dispatch(redoEntryAction(urEntry));
      }
      await dispatch({
        type: UNDO_REDO_SET_INDEX,
        payload: index,
      });
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
    console.log("undoEntry", entry);
    if (!entry.oldData) {
      // undo 'create' => remove
      dispatch(deletePlacementAction(entry.newData));
    } else if (!entry.newData) {
      // undo 'remove' => create
      dispatch(createPlacementAction(entry.oldData));
    }
  };
};

export const redoEntryAction = (entry: UndoRedoListType) => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    if (entry === "START") {
      throw new Error("bad call undoEntryAction");
    }
    console.log("redoEntry", entry);

    if (!entry.oldData) {
      // redo 'create' => create
      dispatch(createPlacementAction(entry.newData));
    } else if (!entry.newData) {
      // redo 'remove' => remove
      dispatch(deletePlacementAction(entry.oldData));
    }
  };
};
