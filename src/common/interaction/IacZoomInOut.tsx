import React from "react";
import Paper from "paper";

import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";

class IacZoomInOut extends React.Component {
  private unsubscribeFn: Function[] = [];

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("zoomIn", this.zoomInHandler),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("zoomOut", this.zoomOutHandler),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  zoomInHandler = (type: AppEventType, center: Paper.Point) => {
    if (!center) {
      center = Paper.view.center;
    }
    Paper.view.scale(1.2, center);
  };

  zoomOutHandler = (type: AppEventType, center: Paper.Point) => {
    if (!center) {
      center = Paper.view.center;
    }
    Paper.view.scale(0.8, center);
  };

  render() {
    return null;
  }
}

export default IacZoomInOut;
