import { combineReducers } from "redux";

import workspace from "./workspace";
import project from "./project";
import graphic from "./graphic";

const reducers = combineReducers({
  workspace,
  project,
  graphic,
});

export default reducers;
