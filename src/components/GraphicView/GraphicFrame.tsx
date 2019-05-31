import React from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";
import KeyboardHandler from "./KeyboardHandler";
import DrawToolbar from "../menu/DrawToolbar";
import ZoomToolbar from "../menu/ZoomToolbar";
import SelectedPlacementToolbar from "../menu/SelectedPlacementToolbar";

const GraphicFrame = () => {
  return (
    <div className="middle-content">
      <GraphicView />
      <DrawToolbar />
      <ZoomToolbar />
      <SelectedPlacementToolbar />
      <Statusbar />
      <KeyboardHandler />
    </div>
  );
};
export default GraphicFrame;
