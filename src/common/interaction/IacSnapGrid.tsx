import React from "react";

import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { snap } from "../snap";

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

  onMouseDown = (event: Paper.MouseEvent) => {
    event.point = this.snap(event);
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    event.point = this.snap(event);
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    event.point = this.snap(event);
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    event.point = this.snap(event);
  };

  private snap(event: Paper.MouseEvent): Paper.Point {
    const grid = 4;
    return new Paper.Point(
      snap(event.point.x, grid),
      snap(event.point.y, grid),
    );
  }

  render() {
    return null;
  }
}

export default IacSnapGrid;
