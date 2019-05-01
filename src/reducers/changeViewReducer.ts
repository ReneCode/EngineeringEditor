import * as actionTypes from "../actions/actionTypes";

export interface IChangeViewState {
  changes: any;
}

const initialState: IChangeViewState = {
  changes: undefined,
};

const changeViewReducer = (
  state = initialState,
  action: { type: string; payload: any },
): IChangeViewState => {
  switch (action.type) {
    case actionTypes.CHANGE_VIEW:
      return {
        ...state,
        changes: action.payload,
      };

    default:
      return state;
  }
};

export default changeViewReducer;
