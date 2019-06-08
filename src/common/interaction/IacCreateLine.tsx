import React from "react";
import { connect } from "react-redux";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import configuration from "../configuration";
import GraphicLine from "../../model/graphic/GraphicLine";
import {
  createElementAction,
  cudElementAction,
} from "../../actions/changeElementActions";

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
    this.firstPoint = event.point;
    this.createLine(this.firstPoint);
  };

  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    if (!this.line) {
      throw new Error("line missing");
    }

    if (this.firstPoint.equals(event.point)) {
      appEventDispatcher.dispatch("stopInteraction");
      return;
    }

    this.createLine(event.point);
    this.saveLine();
    this.line = null;
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (!this.line) {
      throw new Error("line missing");
    }
    this.createLine(event.point);
  };

  private createLine(p2: Paper.Point) {
    if (!this.line) {
      this.line = new GraphicLine(this.firstPoint, p2);
      this.line.color = configuration.defaultStrokeColor;
      this.item = this.line.paperDraw();
    } else {
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
      cudElementAction("placement", { create: this.line }),
    );

    // await this.props.dispatch(setSelectedItemAction(this.line));
  }

  render() {
    return null;
  }
}

export default connect()(IacCreateLine);
