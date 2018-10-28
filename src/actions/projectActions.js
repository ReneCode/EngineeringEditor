import * as actionTypes from "./actionTypes";

export const setProjectId = id => {
  return {
    type: actionTypes.SET_PROJECT_ID,
    payload: id,
  };
};

export const setPage = page => {
  return {
    type: actionTypes.SET_PAGE,
    payload: page,
  };
};
