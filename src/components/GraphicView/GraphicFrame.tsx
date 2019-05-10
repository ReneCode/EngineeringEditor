import React, { Component } from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";
import ZoomToolbar from "./ZoomToolbar";
import KeyboardHandler from "./KeyboardHandler";

const GraphicFrame = () => {
  return (
    <div className="middle-content">
      <GraphicView />
      <ZoomToolbar />
      <KeyboardHandler />
      <Statusbar />
    </div>
  );
};
export default GraphicFrame;
