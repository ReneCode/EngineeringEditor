import * as actionTypes from "../actions/actionTypes";
import { IAction } from "../actions/action";

export interface IInteractionState {
  interaction: string;
}

const initialState: IInteractionState = {
  interaction: "",
};

const interactionReducer = (
  state: IInteractionState = initialState,
  action: IAction,
): IInteractionState => {
  switch (action.type) {
    case actionTypes.SET_INTERACTION:
      return {
        ...state,
        interaction: action.payload,
      };

    default:
      return state;
  }
};

export default interactionReducer;
