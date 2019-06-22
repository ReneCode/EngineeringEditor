import React from "react";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";
import DrawToolbar from "../menu/DrawToolbar";
import ZoomToolbar from "../menu/ZoomToolbar";
import SelectedPlacementToolbar from "../menu/SelectedPlacementToolbar";
import ModalDialog from "../ModalDialog/ModalDialog";
import TextEditView from "./TextEditView";
import PaperInspector from "../PaperInspector/PaperInspector";
import ShortcutHandler from "../ShortcutHandler";

const GraphicFrame = () => {
  return (
    <div className="graphic-frame">
      <GraphicView />
      <TextEditView />
      <DrawToolbar />
      <ZoomToolbar />
      <SelectedPlacementToolbar />
      <Statusbar />
      <ShortcutHandler />
      <ModalDialog />
      <PaperInspector />
    </div>
  );
};
export default GraphicFrame;
