import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentWorkspaceId: undefined
};

const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WORKSPACE_ID:
      return {
        ...state,
        currentWorkspaceId: action.payload
      };
    default:
      return state;
  }
};

export default workspaceReducer;
