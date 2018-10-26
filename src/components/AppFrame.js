import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Topbar from "./Topbar";
import Routing from "./Routing";

const AppFrame = () => {
  return (
    <Router>
      <React.Fragment>
        <Topbar />
        <Routing />
      </React.Fragment>
    </Router>
  );
};

export default AppFrame;
