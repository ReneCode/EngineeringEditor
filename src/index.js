import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import AppFrame from "./components/AppFrame";

import store from "./store";

import "./styles.css";
import "./split-pane.css";

function Main() {
  return (
    <Provider store={store}>
      <AppFrame className="Main" />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
