import React from "react";
import { connect } from "react-redux";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import configuration from "../configuration";
import GraphicLine from "../../model/graphic/GraphicLine";
import Point from "../point";
import { createElementAction } from "../../actions/changeElementActions";
import PaperPlacement from "../../model/graphic/PaperPlacement";
import { ItemName } from "../ItemMetaData";

interface IProps {
  dispatch: Function;
}

class IacLine extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private firstPoint: Paper.Point = new Paper.Point(0, 0);
  private line: Paper.Path | null = null;
  // private newItem: Paper.Item = new Paper.Item();

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
  onMouseUp = async (type: AppEventType, event: Paper.MouseEvent) => {
    if (!this.line) {
      throw new Error("line missing");
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
    if (this.line) {
      this.line.remove();
    }
    this.line = new Paper.Path.Line(this.firstPoint, p2);
    this.line.name = ItemName.itemLine;
    this.line.strokeColor = configuration.defaultStrokeColor;
  }

  private async saveLine() {
    if (!this.line) {
      throw new Error("line missing");
    }

    const paperPlacement = new PaperPlacement(this.line);
    await this.props.dispatch(
      createElementAction("placement", paperPlacement),
    );
  }

  render() {
    return null;
  }
}

export default connect()(IacLine);
