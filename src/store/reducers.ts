import { combineReducers } from "redux";

import environment, { IEnvironmentState } from "./environmentReducer";
import project, { IProjectState } from "./projectReducer";
import graphic, { IGraphicState } from "./graphicReducer";
import undoredo, { IUndoRedoState } from "./undoRedoReducer";

export interface IGlobalState {
  environment: IEnvironmentState;
  project: IProjectState;
  graphic: IGraphicState;
  undoredo: IUndoRedoState;
}

const reducers = combineReducers({
  environment,
  project,
  graphic,
  undoredo,
});

export default reducers;
