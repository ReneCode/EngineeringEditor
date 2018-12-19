import { combineReducers } from "redux";

import interaction from "./interactionReducer";
import workspace, { IWorkspaceState } from "./workspaceReducer";
import project from "./projectReducer";
import graphic, { IGraphicState } from "./graphicReducer";

export interface IGlobalState {
  workspace: IWorkspaceState;
  project: any;
  graphic: IGraphicState;
}

const reducers = combineReducers({
  interaction,
  workspace,
  project,
  graphic,
});

export default reducers;
