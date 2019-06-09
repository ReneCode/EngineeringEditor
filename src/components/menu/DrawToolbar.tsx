import React from "react";

import Toolbar from "./Toolbar";
import ToolbarButtonFactory from "./ToolbarButtonFactory";

const DrawToolbar = () => {
  const stopInteractionButton = ToolbarButtonFactory.create(
    "stopInteraction",
  );
  const createArcButton = ToolbarButtonFactory.create("createArc");
  const createLineButton = ToolbarButtonFactory.create("createLine");
  const createSymbolRefButton = ToolbarButtonFactory.create(
    "createSymbolRef",
  );
  return (
    <Toolbar className="draw-toolbar" direction="column">
      {stopInteractionButton}
      {createLineButton}
      {createArcButton}
      {createSymbolRefButton}
    </Toolbar>
  );
};

export default DrawToolbar;
