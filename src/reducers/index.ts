import { combineReducers } from "redux";

import interaction from "./interactionReducer";
import workspace from "./workspaceReducer";
import project from "./projectReducer";
import graphic, { IGraphicState } from "./graphicReducer";

export interface IGlobalState {
  workspace: any;
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
