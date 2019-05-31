import React from "react";

import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Toolbar from "./Toolbar";

const DrawToolbar = () => {
  return (
    <Toolbar className="draw-toolbar" direction="column">
      <button
        onClick={() =>
          appEventDispatcher.dispatch("stopInteraction")
        }>
        S
      </button>
      <button
        onClick={() =>
          appEventDispatcher.dispatch("startInteraction", "CreateArc")
        }>
        C
      </button>
      <button
        onClick={() =>
          appEventDispatcher.dispatch(
            "startInteraction",
            "CreateLine",
          )
        }>
        L
      </button>
    </Toolbar>
  );
};

export default DrawToolbar;
