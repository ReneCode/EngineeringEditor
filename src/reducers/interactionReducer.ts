import * as actionTypes from "../actions/actionTypes";

export interface IInteractionState {
  startInteractionHandler: Function;
  interactions: string[];
}

const initialState: IInteractionState = {
  startInteractionHandler: (action: any) => {
    console.log("start interaction:", action);
  },
  interactions: [],
};

const interactionReducer = (
  state: IInteractionState = initialState,
  action: any,
) => {
  switch (action.type) {
    // case actionTypes.PUSH_INTERACTION:
    //   return {
    //     ...state,
    //   };
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
