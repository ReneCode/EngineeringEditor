import React from "react";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { connect } from "react-redux";
import { createElementAction } from "../../actions/changeElementActions";
import GraphicConnectionPoint from "../../model/graphic/GraphicConnectionPoint";

interface IProps {
  dispatch: Function;
}

class IacCreateArc extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private connectionPoint: GraphicConnectionPoint | null = null;

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

  onMouseDown = (event: Paper.MouseEvent) => {
    this.createConnectionPoint(event.point);
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    if (!this.connectionPoint) {
      throw new Error("connectionPoint missing");
    }

    this.createConnectionPoint(event.point);
    this.saveConnectionPoint();
    this.connectionPoint = null;
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    if (!this.connectionPoint) {
      throw new Error("connectionPoint missing");
    }

    this.createConnectionPoint(event.point);
  };

  private createConnectionPoint(pt: Paper.Point) {
    if (!this.connectionPoint) {
      this.connectionPoint = new GraphicConnectionPoint(pt);
      this.connectionPoint.paperDraw();
    } else {
      this.connectionPoint.pt = pt;
      this.connectionPoint.paperDraw();
    }
  }

  private async saveConnectionPoint() {
    if (!this.connectionPoint) {
      throw new Error("connectionPoint missing");
    }

    await this.props.dispatch(
      createElementAction("placement", this.connectionPoint),
    );
  }

  render() {
    return null;
  }
}

export default connect()(IacCreateArc);
