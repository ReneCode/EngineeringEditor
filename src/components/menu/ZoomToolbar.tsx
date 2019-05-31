import React from "react";

import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Toolbar from "./Toolbar";

const ZoomToolbar = () => {
  return (
    <Toolbar className="zoom-toolbar">
      <button onClick={() => appEventDispatcher.dispatch("zoomIn")}>
        +
      </button>
      <button onClick={() => appEventDispatcher.dispatch("zoomOut")}>
        -
      </button>
    </Toolbar>
  );
};

export default ZoomToolbar;
