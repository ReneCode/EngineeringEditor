import * as actionTypes from "./actionTypes";

export const setProjectId = id => {
  return {
    type: actionTypes.SET_PROJECT_ID,
    payload: id,
  };
};

export const loadPages = projectId => {
  return {
    type: actionTypes.LOAD_PAGES,
    payload: projectId,
  };
};

export const createPage = (projectId, page, callback) => {
  return {
    type: actionTypes.CREATE_PAGE,
    payload: {
      projectId,
      page,
      callback,
    },
  };
};

export const addPage = page => {
  return {
    type: actionTypes.ADD_PAGE,
    payload: page,
  };
};

export const setPages = pages => {
  return {
    type: actionTypes.SET_PAGES,
    payload: pages,
  };
};
