import React, { Component } from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";
import ZoomToolbar from "./ZoomToolbar";

const GraphicFrame = () => {
  return (
    <div className="middle-content">
      <GraphicView />
      <ZoomToolbar />
      <Statusbar />
    </div>
  );
};
export default GraphicFrame;
