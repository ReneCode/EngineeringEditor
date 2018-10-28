import * as actionTypes from "./actionTypes";
export * from "./canvasActions.js";
export * from "./graphicActions.js";

const deviceUrl = "http://riffer.eu/riffer/api/devices";

export const setWorkspaceId = id => {
  return {
    type: actionTypes.SET_WORKSPACE_ID,
    payload: id,
  };
};

export const setSelectedDevice = device => {
  return {
    type: actionTypes.SET_SELECTED_DEVICE,
    payload: device,
  };
};

//  ---------- devices ---------

const addDevice = name => {
  return {
    type: actionTypes.ADD_DEVICE,
    payload: name,
  };
};

export const saveDevice = device => {
  return async dispatch => {
    try {
      const response = await fetch(deviceUrl, {
        method: "POST",
        body: JSON.stringify(device),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      await dispatch(addDevice(json));
      dispatch(setSelectedDevice(json));
    } catch (err) {}
  };
};

// used by loadDevices
const setDevices = devices => {
  return {
    type: actionTypes.SET_DEVICES,
    payload: devices,
  };
};

export const loadDevices = () => {
  return async dispatch => {
    try {
      const response = await fetch(deviceUrl);
      const json = await response.json();
      dispatch(setDevices(json));
    } catch (err) {}
  };
};
