import * as actionTypes from "../actions/actionTypes";
import { IGlobalState } from "../reducers";

const interactionMiddleware = (store: any) => (next: any) => (
  action: any,
) => {
  try {
    if (action.type === actionTypes.SET_PLACEMENT) {
      const state: IGlobalState = store.getState();
      // console.log("set-placement middleware");
    }
  } catch (ex) {
    console.log("Exception:", ex);
  }
  const result = next(action);
  return result;
};

export default interactionMiddleware;
