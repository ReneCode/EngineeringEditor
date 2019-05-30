import * as actionTypes from "./actionTypes";
import {
  UNDO_REDO_ADD_START_MARKER,
  UNDO_REDO_ADD,
  UNDO_REDO_SET_INDEX,
} from "./actionTypes";

import {
  deletePlacementAction,
  createPlacementAction,
  updatePlacementAction,
} from "./placementActions";

import { RefType } from "../model/types";
import {
  UndoRedoListEntry,
  UndoRedoListType,
} from "../store/undoRedoReducer";
import { IGlobalState } from "../store/reducers";

export const undoRedoAddStartMarkerCommit = () => {
  return {
    type: UNDO_REDO_ADD_START_MARKER,
  };
};

export const undoRedoAddCommit = (
  ref: RefType,
  oldData: any,
  newData: any,
): { type: string; payload: UndoRedoListEntry } => {
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
        await dispatch(undoOneEntryAction(urEntry));
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
        await dispatch(redoOneEntryAction(urEntry));
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

const undoOneEntryAction = (entry: UndoRedoListType) => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    if (entry === "START") {
      throw new Error("bad call undoEntryAction");
    }
    if (!entry.oldData) {
      // undo 'create' => delete
      dispatch({
        type: actionTypes.CHANGE_VIEW,
        payload: {
          type: "delete",
          data: entry.newData,
        },
      });
      dispatch(deletePlacementAction(entry.newData));
    } else if (!entry.newData) {
      // undo 'delete' => create
      dispatch(createPlacementAction(entry.oldData));
    } else {
      // undo 'update' => update(old)
      dispatch({
        type: actionTypes.CHANGE_VIEW,
        payload: {
          type: "update",
          data: entry.oldData,
        },
      });
      dispatch(updatePlacementAction(entry.oldData));
    }
  };
};

const redoOneEntryAction = (entry: UndoRedoListType) => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    if (entry === "START") {
      throw new Error("bad call undoEntryAction");
    }

    if (!entry.oldData) {
      // redo 'create' => create
      dispatch(createPlacementAction(entry.newData));
    } else if (!entry.newData) {
      // redo 'delete' => delete
      dispatch(deletePlacementAction(entry.oldData));
    } else {
      // redo 'update' => update(new)
      dispatch(updatePlacementAction(entry.newData));
    }
  };
};
