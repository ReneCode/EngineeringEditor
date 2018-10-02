import * as actionTypes from "./actionTypes";

export const addDevice = device => {
  return {
    type: actionTypes.ADD_DEVICE,
    payload: device
  };
};

export const setWorkspaceId = id => {
  return {
    type: actionTypes.SET_WORKSPACE_ID,
    payload: id
  };
};

export const setSelectedDevice = device => {
  return {
    type: actionTypes.SET_SELECTED_DEVICE,
    payload: device
  };
};
