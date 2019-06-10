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
  const placeSymbolButton = ToolbarButtonFactory.create(
    "selectPlaceSymbol",
  );
  return (
    <Toolbar className="draw-toolbar" direction="column">
      {stopInteractionButton}
      {createLineButton}
      {createArcButton}
      {createSymbolRefButton}
      {placeSymbolButton}
    </Toolbar>
  );
};

export default DrawToolbar;
