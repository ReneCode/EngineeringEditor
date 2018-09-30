import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import App from "./components/App";

import store from "./store";

import "./styles.css";
import "./split-pane.css";

function Main() {
  return (
    <Provider store={store}>
      <div className="Main">
        <App />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
