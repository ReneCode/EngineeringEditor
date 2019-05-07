import React from "react";
import Paper from "paper";
import InteractionBase from "./InteractionBase";
import GraphicCircle from "../../model/graphic/GraphicCircle";
import Point from "../point";
import { createElementAction } from "../../actions/changeElementActions";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import { connect } from "react-redux";

const FILL_COLOR = "#ee33F0Ee";
const COLOR = "#00EE11";

interface IProps {
  dispatch: Function;
}

class IacCircle extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];

  circle: Paper.Path | null = null;
  start: Paper.Point = new Paper.Point(0, 0);
  radius: number = 0;

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseUp", this.onMouseUp),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDrag", this.onMouseDrag),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDown", this.onMouseDown),
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    this.start = event.point;
    this.createCircle(this.start, 0);
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.circle) {
      // typescript-disable-next-line
      const diff = event.point.subtract(this.start);
      this.radius = diff.length;
      this.createCircle(this.start, this.radius);
    }
  };

  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.circle) {
      this.circle.strokeColor = "black";
      this.finish();
      this.circle = null;
    }
  };

  private async finish() {
    if (!this.circle) {
      throw new Error("circle not set");
    }

    const circle = new GraphicCircle(
      new Point(this.start.x, this.start.y),
      this.radius,
    );
    circle.fill = FILL_COLOR;
    circle.color = COLOR;
    await this.props.dispatch(
      createElementAction("placement", circle),
    );
  }

  private createCircle(center: Paper.Point, radius: number) {
    if (this.circle) {
      this.circle.remove();
    }
    this.circle = new Paper.Path.Circle(center, radius);
    this.circle.strokeColor = COLOR;
    this.circle.fillColor = FILL_COLOR;
  }

  render() {
    return null;
  }
}

export default connect()(IacCircle);
