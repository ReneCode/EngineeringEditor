import { combineReducers } from "redux";

import workspace from "./workspace";
import project from "./project";
import graphic, { IGraphicState } from "./graphic";

export interface IGlobalState {
  workspace: any;
  project: any;
  graphic: IGraphicState;
}

const reducers = combineReducers({
  workspace,
  project,
  graphic,
});

export default reducers;
