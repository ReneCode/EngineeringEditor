import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Topbar from "../Topbar";
import Routing from "./Routing";
import "./AppFrame.css";

const App = () => {
  return (
    <Router>
      <div>
        <Topbar />
        <Routing />
      </div>
    </Router>
  );
};

export default App;
