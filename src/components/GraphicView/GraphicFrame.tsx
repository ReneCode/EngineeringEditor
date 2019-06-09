import React from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";
import KeyboardHandler from "./KeyboardHandler";
import DrawToolbar from "../menu/DrawToolbar";
import ZoomToolbar from "../menu/ZoomToolbar";
import SelectedPlacementToolbar from "../menu/SelectedPlacementToolbar";
import SelectSymbolToolbar from "../menu/SelectSymbolToolbar";

const GraphicFrame = () => {
  return (
    <div className="middle-content">
      <GraphicView />
      <DrawToolbar />
      <SelectSymbolToolbar />
      <ZoomToolbar />
      <SelectedPlacementToolbar />
      <Statusbar />
      <KeyboardHandler />
    </div>
  );
};
export default GraphicFrame;
