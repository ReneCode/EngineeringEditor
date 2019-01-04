import { combineReducers } from "redux";

import interaction, { IInteractionState } from "./interactionReducer";
import environment, { IEnvironmentState } from "./environmentReducer";
import project, { IProjectState } from "./projectReducer";
import graphic, { IGraphicState } from "./graphicReducer";

export interface IGlobalState {
  environment: IEnvironmentState;
  project: IProjectState;
  graphic: IGraphicState;
  interaction: IInteractionState;
}

const reducers = combineReducers({
  interaction,
  environment,
  project,
  graphic,
});

export default reducers;
