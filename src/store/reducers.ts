import { combineReducers } from "redux";

import project, { IProjectState } from "./projectReducer";
import graphic, { IGraphicState } from "./graphicReducer";
import undoredo, { IUndoRedoState } from "./undoRedoReducer";

export interface IGlobalState {
  project: IProjectState;
  graphic: IGraphicState;
  undoredo: IUndoRedoState;
}

const reducers = combineReducers({
  project,
  graphic,
  undoredo,
});

export default reducers;
