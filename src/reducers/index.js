import { combineReducers } from "redux";

import workspace from "./workspace";
import project from "./project";

const reducers = combineReducers({
  workspace,
  project
});

export default reducers;
