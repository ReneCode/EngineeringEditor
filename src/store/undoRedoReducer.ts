import * as actionTypes from "../actions/actionTypes";
import { IAction } from "../actions/action";
import { RefType } from "../model/types";

export type IUndoRedoState = {
  urList: UndoRedoListType[];
  currentIndex: number;
  canUndo: boolean;
  canRedo: boolean;
};

export type UndoRedoListEntry = {
  ref: RefType;
  oldData: any;
  newData: any;
};

type UndoRedoStartMarker = "START";
export type UndoRedoListType =
  | UndoRedoListEntry
  | UndoRedoStartMarker;

const initialState: IUndoRedoState = {
  urList: [],
  currentIndex: -1,
  canUndo: false,
  canRedo: false,
};

const addAndUpdateCanUndoRedo = (
  state: IUndoRedoState,
  entry: UndoRedoListType,
): IUndoRedoState => {
  let urList = state.urList.map(e => e);
  urList.splice(state.currentIndex + 1);
  urList.push(entry);
  const currentIndex = urList.length - 1;
  let canUndo = false;
  let canRedo = false;
  if (currentIndex >= 0) {
    canUndo = true;
  }
  if (currentIndex < urList.length - 1) {
    canRedo = true;
  }
  return {
    ...state,
    currentIndex,
    urList,
    canUndo,
    canRedo,
  };
};

const undoRedoReducer = (
  state: IUndoRedoState = initialState,
  action: IAction = { type: "" },
): IUndoRedoState => {
  switch (action.type) {
    case actionTypes.UNDO_REDO_ADD:
      return addAndUpdateCanUndoRedo(state, {
        ref: action.payload.ref,
        oldData: action.payload.oldData,
        newData: action.payload.newData,
      });

    case actionTypes.UNDO_REDO_ADD_START_MARKER:
      return addAndUpdateCanUndoRedo(state, "START");

    case actionTypes.UNDO_REDO_SET_INDEX: {
      let canUndo = false;
      let canRedo = false;
      const currentIndex = action.payload;
      if (currentIndex >= 0) {
        canUndo = true;
      }
      if (currentIndex < state.urList.length - 1) {
        canRedo = true;
      }
      return {
        ...state,
        currentIndex,
        canRedo,
        canUndo,
      };
    }

    default:
      return state;
  }
};

export default undoRedoReducer;
