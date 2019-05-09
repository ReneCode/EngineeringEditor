import React from "react";
import Paper from "paper";

import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";

class IacZoomInOut extends React.Component {
  state = {
    cursor: new Paper.Point(0, 0),
  };
  private unsubscribeFn: Function[] = [];

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("keyDown", this.onKeyDown),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe(
        "mouseMove",
        this.mouseEventHandler,
      ),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe(
        "mouseDrag",
        this.mouseEventHandler,
      ),
    );

    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("zoomIn", this.zoomInHandler),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("zoomOut", this.zoomOutHandler),
    );
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

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  mouseEventHandler = (
    type: AppEventType,
    event: Paper.MouseEvent,
  ) => {
    this.setState({
      cursor: event.point,
    });
  };

  onKeyDown = (type: AppEventType, event: KeyboardEvent) => {
    switch (event.key) {
      case "+":
        appEventDispatcher.dispatch("zoomIn");
        break;
      case "-":
        appEventDispatcher.dispatch("zoomOut");
        break;
    }
  };

  render() {
    return null;
  }
}

export default IacZoomInOut;
