import React from "react";

import Toolbar from "./Toolbar";
import ToolbarButtonFactory from "./ToolbarButtonFactory";

const DrawToolbar = () => {
  const stopInteractionButton = ToolbarButtonFactory.create(
    "stopInteraction",
  );
  const createArcButton = ToolbarButtonFactory.create("createArc");
  const createLineButton = ToolbarButtonFactory.create("createLine");
  const createTextButton = ToolbarButtonFactory.create("createText");
  const placeSymbolButton = ToolbarButtonFactory.create(
    "selectPlaceSymbol",
  );
  return (
    <Toolbar className="draw-toolbar" direction="column">
      {stopInteractionButton}
      {createLineButton}
      {createArcButton}
      {createTextButton}
      {placeSymbolButton}
    </Toolbar>
  );
};

export default DrawToolbar;
