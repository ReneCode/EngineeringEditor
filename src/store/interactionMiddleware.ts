import * as actionTypes from "../actions/actionTypes";
import { IGlobalState } from "../reducers";

const interactionMiddleware = (store: any) => (next: any) => (
  action: any,
) => {
  try {
    if (action.type === actionTypes.DO_INTERACTION) {
      const state: IGlobalState = store.getState();
      if (
        state.interaction &&
        state.interaction.doInteractionHandler
      ) {
        state.interaction.doInteractionHandler(action);
      } else {
        console.log("doInteractionHandler not set");
      }
    }
  } catch (ex) {
    console.log("Exception:", ex);
  }
  const result = next(action);
  return result;
};

export default interactionMiddleware;
