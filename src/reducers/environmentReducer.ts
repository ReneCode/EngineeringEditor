import * as actionTypes from "../actions/actionTypes";

export interface IEnvironmentState {
  viewObject: any[];
}

const initialState: IEnvironmentState = {
  viewObject: [],
};

const environmentReducer = (
  state = initialState,
  action: { type: string; payload: any },
): IEnvironmentState => {
  switch (action.type) {
    case actionTypes.SET_VIEW_OBJECT:
      return {
        ...state,
        viewObject: action.payload,
      };
    default:
      return state;
  }
};

export default environmentReducer;
