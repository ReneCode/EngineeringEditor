import * as actionTypes from "./actionTypes";
export * from "./graphicActions.js";
export * from "./mouseActions.js";
export * from "./projectActions";
export * from "./zoomActions";

export const setTempItem = item => {
  return {
    type: actionTypes.SET_TEMP_ITEM,
    payload: item,
  };
};

export const startInteraction = iaType => {
  return {
    type: actionTypes.START_INTERACTION,
    payload: iaType,
  };
};
