import * as actionTypes from "../actions/actionTypes";

export interface IEnvironmentState {}

const initialState: IEnvironmentState = {};

const environmentReducer = (
  state = initialState,
  action: { type: string; payload: any },
): IEnvironmentState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default environmentReducer;
