import React from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";
import DrawToolbar from "../menu/DrawToolbar";
import ZoomToolbar from "../menu/ZoomToolbar";
import SelectedPlacementToolbar from "../menu/SelectedPlacementToolbar";
import ModalDialog from "../ModalDialog/ModalDialog";
import TextEditView from "./TextEditView";
import KeyboardHandler from "../ModalDialog/KeyboardHandler";

const GraphicFrame = () => {
  return (
    <div className="middle-content">
      <GraphicView />
      <TextEditView />
      <DrawToolbar />
      <ZoomToolbar />
      <SelectedPlacementToolbar />
      <Statusbar />
      <KeyboardHandler />
      <ModalDialog />
    </div>
  );
};
export default GraphicFrame;
