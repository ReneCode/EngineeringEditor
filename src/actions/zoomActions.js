import * as actionTypes from "./actionTypes";

export const zoomWindow = () => {
  return {
    type: actionTypes.ZOOM_WINDOW,
  };
};

export const zoomFull = () => {
  return {
    type: actionTypes.ZOOM_FULL,
  };
};
