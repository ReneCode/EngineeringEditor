import React, { Component } from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";

const GraphicFrame = () => {
  return (
    <div className="middle-content">
      <GraphicView />
      <Statusbar />
    </div>
  );
};
export default GraphicFrame;
