import { combineReducers } from "redux";

import interaction, { IInteractionState } from "./interactionReducer";
import environment, { IEnvironmentState } from "./environmentReducer";
import project, { IProjectState } from "./projectReducer";
import graphic, { IGraphicState } from "./graphicReducer";
import undoredo, { IUndoRedoState } from "./undoRedoReducer";

export interface IGlobalState {
  environment: IEnvironmentState;
  project: IProjectState;
  graphic: IGraphicState;
  interaction: IInteractionState;
  undoredo: IUndoRedoState;
}

const reducers = combineReducers({
  interaction,
  environment,
  project,
  graphic,
  undoredo,
});

export default reducers;
