import React from "react";
import { connect } from "react-redux";
import Paper, { Point } from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import configuration from "../configuration";
import GraphicLine from "../../model/graphic/GraphicLine";
import { cudElementAction } from "../../actions/changeElementActions";
import { snapEvent } from "../SnapToGrid";

interface IProps {
  dispatch: Function;
}

class IacCreateLine extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private firstPoint: Paper.Point = new Paper.Point(0, 0);
  private line: GraphicLine | null = null;
  private item: Paper.Item = new Paper.Item();

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
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
    if (this.item) {
      this.item.remove();
    }
  }

  onMouseMove = (event: Paper.MouseEvent) => {
    console.log("mouseMove");
    const pt = snapEvent(event);
    this.createLine(pt, pt.add(new Point(50, -50)));
  };

  onMouseDown = (event: Paper.MouseEvent) => {
    console.log("mouseDown");

    const pt = snapEvent(event);
    this.firstPoint = pt;
    this.createLine(this.firstPoint, pt);
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    if (!this.line) {
      throw new Error("line missing");
    }

    const pt = snapEvent(event);
    if (this.firstPoint.equals(pt)) {
      appEventDispatcher.dispatch("stopInteraction");
      return;
    }

    this.createLine(this.firstPoint, pt);
    this.saveLine();
    this.line = null;
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    const pt = snapEvent(event);

    if (!this.line) {
      throw new Error("line missing");
    }
    this.createLine(this.firstPoint, pt);
  };

  private createLine(p1: Paper.Point, p2: Paper.Point) {
    if (!this.line) {
      this.line = new GraphicLine(p1, p2);
      this.line.color = configuration.defaultStrokeColor;
      this.item = this.line.paperDraw();
    } else {
      this.line.p1 = p1;
      this.line.p2 = p2;
      this.item.remove();
      this.item = this.line.paperDraw();
    }
  }

  private async saveLine() {
    if (!this.line) {
      throw new Error("line missing");
    }

    await this.props.dispatch(
      cudElementAction("placement", this.line),
    );

    // await this.props.dispatch(setSelectedItemAction(this.line));
  }

  render() {
    return null;
  }
}

export default connect()(IacCreateLine);
