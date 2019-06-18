import { createStore, applyMiddleware, compose } from "redux";

import reduxThunk, { ThunkDispatch } from "redux-thunk";

import reducers, { IGlobalState } from "./reducers";

// This enables the redux dev tools extension, or does nothing if not installed
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: {
  dispatch: ThunkDispatch<{}, {}, any>;
  getState: () => IGlobalState;
} = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk)),
);

export default store;
