import * as actionTypes from "../actions/actionTypes";
import { IAction } from "../actions/action";
import { IaEventType } from "../components/interaction/IaBase";
import { IIaEvent, IIaEventHandler } from "../model/types";

interface EventHandler {
  eventType: IaEventType;
  handler: IIaEventHandler;
}

export interface IInteractionState {
  doInteractionHandler: Function | null;
  eventHandler: EventHandler[];
}

const initialState: IInteractionState = {
  doInteractionHandler: null,
  eventHandler: [],
};

const addEventHandler = (
  state: IInteractionState,
  action: IAction,
): IInteractionState => {
  return {
    ...state,
    eventHandler: state.eventHandler.concat(action.payload),
  };
};

const removeEventHandler = (
  state: IInteractionState,
  action: IAction,
): IInteractionState => {
  const idx = state.eventHandler.findIndex(
    (eh: EventHandler) =>
      eh.eventType === action.payload.eventType &&
      eh.handler === action.payload.handler,
  );
  if (idx >= 0) {
    return {
      ...state,
      eventHandler: state.eventHandler
        .slice(0, idx)
        .concat(state.eventHandler.slice(idx + 1)),
    };
  } else {
    console.log("removeEventHandler - handler not found");
    return state;
  }
};

const interactionReducer = (
  state: IInteractionState = initialState,
  action: IAction,
): IInteractionState => {
  switch (action.type) {
    case actionTypes.SET_DO_INTERACTION_HANDLER:
      return {
        ...state,
        doInteractionHandler: action.payload,
      };

    case actionTypes.ADD_EVENT_HANDLER:
      return addEventHandler(state, action);

    case actionTypes.REMOVE_EVENT_HANDLER:
      return removeEventHandler(state, action);

    default:
      return state;
  }
};

export default interactionReducer;
