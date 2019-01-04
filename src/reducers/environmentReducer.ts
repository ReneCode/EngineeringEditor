import * as actionTypes from "../actions/actionTypes";

export interface IEnvironmentState {
  selectedObjectType: string;
  // workspaceId: string;
}

const initialState: IEnvironmentState = {
  selectedObjectType: "",
  // workspaceId: "",
};

const environmentReducer = (
  state = initialState,
  action: { type: string; payload: any },
): IEnvironmentState => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_OBJECT_TYPE:
      return {
        ...state,
        selectedObjectType: action.payload,
      };
    default:
      return state;
  }
};

export default environmentReducer;
