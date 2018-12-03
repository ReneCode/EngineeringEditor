import { createStore, applyMiddleware, compose } from "redux";

import reduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import interactionMiddleware from "./interactionMiddleware";

import reducers from "../reducers";
import rootSagas from "../sagas";

// This enables the redux dev tools extension, or does nothing if not installed
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      interactionMiddleware,
      reduxThunk,
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(rootSagas);

export default store;
