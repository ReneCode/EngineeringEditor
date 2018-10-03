import * as React from "react";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";
import theme from "./theme";
import App from "./components/App";

import store from "./store";

import "./styles.css";
import "./split-pane.css";

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="Main">
          <App />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
