import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import AppFrame from "./components/AppFrame";

import store from "./store";

import "./styles.scss";
import "./split-pane.css";

function Main() {
  return (
    <Provider store={store}>
      <AppFrame className="Main" />
    </Provider>
  );
}

const rootElement = document.getElementById("root");

// https://github.com/reactjs/react-modal/issues/576
Modal.setAppElement(rootElement);

ReactDOM.render(<Main />, rootElement);
