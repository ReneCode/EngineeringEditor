import * as actionTypes from "../actions/actionTypes";

const interactionMiddleware = store => next => action => {
  try {
    if (action.type === actionTypes.START_INTERACTION) {
      const state = store.getState();
      state.interaction.startInteractionHandler(action);
    }
  } catch (ex) {
    console.log("Exception:", ex);
  }
  const result = next(action);
  return result;
};

export default interactionMiddleware;
