import { combineReducers } from "redux";

import interaction, { IInteractionState } from "./interactionReducer";
import environment, { IEnvironmentState } from "./environmentReducer";
import project, { IProjectState } from "./projectReducer";
import graphic, { IGraphicState } from "./graphicReducer";
import undoredo, { IUndoRedoState } from "./undoRedoReducer";
import changeView, { IChangeViewState } from "./changeViewReducer";
import editor, { IEditorState } from "./editorReducer";

export interface IGlobalState {
  environment: IEnvironmentState;
  project: IProjectState;
  graphic: IGraphicState;
  interaction: IInteractionState;
  undoredo: IUndoRedoState;
  changeView: IChangeViewState;
  editor: IEditorState;
}

const reducers = combineReducers({
  interaction,
  environment,
  project,
  graphic,
  undoredo,
  changeView,
  editor,
});

export default reducers;
