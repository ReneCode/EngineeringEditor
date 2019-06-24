import React from "react";
import Paper from "paper";

import Statusbar from "./Statusbar";
import GraphicView from "./GraphicView";
import DrawToolbar from "../menu/DrawToolbar";
import ZoomToolbar from "../menu/ZoomToolbar";
import SelectedPlacementToolbar from "../menu/SelectedPlacementToolbar";
import ModalDialog from "../ModalDialog/ModalDialog";
import TextEditView from "./TextEditView";
import PaperInspector from "../PaperInspector/PaperInspector";
import ShortcutHandler from "../ShortcutHandler";

class GraphicFrame extends React.Component {
  frame: any;
  state = {
    canvasSize: new Paper.Size(0, 0),
  };

  componentDidMount() {
    if (this.frame) {
      const { width, height } = this.frame.getBoundingClientRect();
      this.setState({
        canvasSize: new Paper.Size(width, height),
      });
      console.log(width, height);
    }
  }

  render() {
    return (
      <div ref={div => (this.frame = div)} className="graphic-frame">
        <GraphicView />
        <TextEditView />
        <DrawToolbar />
        <ZoomToolbar />
        <SelectedPlacementToolbar
          canvasSize={this.state.canvasSize}
        />
        <Statusbar />
        <ShortcutHandler />
        <ModalDialog />
        <PaperInspector />
      </div>
    );
  }
}
export default GraphicFrame;
