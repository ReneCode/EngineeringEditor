import React from "react";

import "./ZoomToolbar.scss";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

class ZoomToolbar extends React.Component {
  onZoomIn = () => {
    appEventDispatcher.dispatch("zoomIn");
  };

  onZoomOut = () => {
    appEventDispatcher.dispatch("zoomOut");
  };

  render() {
    return (
      <div className="zoomview toolbar">
        <button onClick={this.onZoomIn}>+</button>
        <span> </span>
        <button onClick={this.onZoomOut}>-</button>
      </div>
    );
  }
}

export default ZoomToolbar;
