import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import AppFrame from "./components/AppFrame";

import store from "./store";

import "./styles.scss";

function Main() {
  return (
    <Provider store={store}>
      <AppFrame className="Main" />
    </Provider>
  );
}

// https://www.cypress.io/blog/2018/11/14/testing-redux-store/
if (window.Cypress) {
  window.store = store;
}

const rootElement = document.getElementById("root");

// https://github.com/reactjs/react-modal/issues/576
Modal.setAppElement(rootElement);

ReactDOM.render(<Main />, rootElement);
