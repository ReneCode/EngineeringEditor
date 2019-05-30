import React from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";
import ZoomToolbar from "./ZoomToolbar";
import KeyboardHandler from "./KeyboardHandler";
import PopupMenu from "../menu/PopupMenu";
import DrawToolbar from "./DrawToolbar";

const GraphicFrame = () => {
  return (
    <div className="middle-content">
      <GraphicView />
      <DrawToolbar />
      <ZoomToolbar />
      <PopupMenu />
      <Statusbar />
      <KeyboardHandler />
    </div>
  );
};
export default GraphicFrame;
