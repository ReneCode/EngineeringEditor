import { combineReducers } from "redux";

import interaction, { IInteractionState } from "./interactionReducer";
import workspace, { IWorkspaceState } from "./workspaceReducer";
import project, { IProjectState } from "./projectReducer";
import graphic, { IGraphicState } from "./graphicReducer";

export interface IGlobalState {
  workspace: IWorkspaceState;
  project: IProjectState;
  graphic: IGraphicState;
  interaction: IInteractionState;
}

const reducers = combineReducers({
  interaction,
  workspace,
  project,
  graphic,
});

export default reducers;
