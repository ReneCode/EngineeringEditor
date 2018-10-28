import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projectId: undefined,
  page: undefined,
  selectedDevice: undefined,
  devices: [
    {
      name: "K1",
      devices: [
        {
          name: "K1",
        },
        {
          name: "NC",
        },
        { name: "NO" },
      ],
    },
    { name: "F1" },
    { name: "F2" },
    { name: "F3" },
    { name: "F6" },
    { name: "=A3+O3-F2" },
  ],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case actionTypes.SET_PROJECT_ID:
      return {
        ...state,
        projectId: action.payload,
      };

    case actionTypes.SET_SELECTED_DEVICE:
      return {
        ...state,
        selectedDevice: action.payload,
      };

    case actionTypes.SET_DEVICES: {
      return {
        ...state,
        devices: action.payload,
      };
    }
    case actionTypes.ADD_DEVICE:
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        devices: state.devices.concat(action.payload),
      };
    default:
      return state;
  }
};

export default projectReducer;
