import * as actionTypes from "../actions/actionTypes";

export interface IInteractionState {
  startInteractionHandler: Function | null;
}

const initialState: IInteractionState = {
  startInteractionHandler: null,
};

const interactionReducer = (
  state: IInteractionState = initialState,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case actionTypes.SET_START_INTERACTION_HANDLER:
      return {
        ...state,
        startInteractionHandler: action.payload,
      };
    default:
      return state;
  }
};

export default interactionReducer;
