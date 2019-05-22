import { createStore, applyMiddleware, compose } from "redux";

import reduxThunk from "redux-thunk";

import reducers from "../reducers";

// This enables the redux dev tools extension, or does nothing if not installed
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk)),
);

export default store;
