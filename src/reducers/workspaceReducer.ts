import * as actionTypes from "../actions/actionTypes";

export interface IWorkspaceState {
  // workspaceId: string;
}

const initialState: IWorkspaceState = {
  // workspaceId: "",
};

const workspaceReducer = (
  state = initialState,
  action: { type: string; payload: any },
): IWorkspaceState => {
  switch (action.type) {
    // case actionTypes.SET_WORKSPACE_ID:
    //   return {
    //     ...state,
    //     workspaceId: action.payload,
    //   };
    default:
      return state;
  }
};

export default workspaceReducer;
