import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import "./styles.css";
import "./split-pane.css";

function Main() {
  return (
    <div className="Main">
      <App />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
