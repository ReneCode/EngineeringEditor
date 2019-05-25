import React from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";
import ZoomToolbar from "./ZoomToolbar";
import KeyboardHandler from "./KeyboardHandler";
import PopupMenu from "../menu/PopupMenu";

const GraphicFrame = () => {
  return (
    <div className="middle-content">
      <GraphicView />
      <ZoomToolbar />
      <KeyboardHandler />
      <PopupMenu />
      <Statusbar />
    </div>
  );
};
export default GraphicFrame;
