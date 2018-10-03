import * as actionTypes from "./actionTypes";

const deviceUrl = "http://riffer.eu/riffer/api/devices";

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

//  ---------- devices ---------

const addDevice = name => {
  return {
    type: actionTypes.ADD_DEVICE,
    payload: name
  };
};

export const saveDevice = device => {
  return dispatch => {
    fetch(deviceUrl, {
      method: "POST",
      body: JSON.stringify(device),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(addDevice(json));
      });
  };
};

// used by loadDevices
const setDevices = devices => {
  return {
    type: actionTypes.SET_DEVICES,
    payload: devices
  };
};

export const loadDevices = () => {
  return (dispatch, getState) => {
    fetch(deviceUrl)
      .then(response => response.json())
      .then(json => {
        dispatch(setDevices(json));
      });
  };
};
