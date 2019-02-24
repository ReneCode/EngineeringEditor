import React, { Component } from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";

const GraphicFrame = () => {
  return (
    <div className="middle-content">
      <GraphicView />
      <Statusbar cursor={"cursorWc"} />
    </div>
  );
};
export default GraphicFrame;
