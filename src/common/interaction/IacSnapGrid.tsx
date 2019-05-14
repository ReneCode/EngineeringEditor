import React from "react";

import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";

class IacSnapGrid extends React.Component {
  unsubscribeFn: Function[] = [];

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDrag", this.onMouseDrag),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseUp", this.onMouseUp),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDown", this.onMouseDown),
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    event.point = new Paper.Point(
      Math.round(event.point.x),
      Math.round(event.point.y),
    );
  };

  onMouseMove = (type: AppEventType, event: Paper.MouseEvent) => {
    event.point = new Paper.Point(
      Math.round(event.point.x),
      Math.round(event.point.y),
    );
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    event.point = new Paper.Point(
      Math.round(event.point.x),
      Math.round(event.point.y),
    );
  };

  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    event.point = new Paper.Point(
      Math.round(event.point.x),
      Math.round(event.point.y),
    );
  };

  render() {
    return null;
  }
}

export default IacSnapGrid;
