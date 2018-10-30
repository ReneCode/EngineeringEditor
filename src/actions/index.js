import * as actionTypes from "./actionTypes";
export * from "./graphicActions.js";
export * from "./mouseActions.js";
export * from "./projectActions";
export * from "./apiActions";
export * from "./zoomActions";

export const startInteraction = iaType => {
  return {
    type: actionTypes.START_INTERACTION,
    payload: iaType,
  };
};
