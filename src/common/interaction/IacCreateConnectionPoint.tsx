import React from "react";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { connect } from "react-redux";
import { createElementAction } from "../../actions/changeElementActions";
import GraphicConnectionPoint from "../../model/graphic/GraphicConnectionPoint";
import SnapToGrid from "../SnapToGrid";

interface IProps {
  dispatch: Function;
}

class IacCreateArc extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private connectionPoint: GraphicConnectionPoint | null = null;
  private snapToGrid = new SnapToGrid();
  item: Paper.Item = new Paper.Item();

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
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
    if (this.item) {
      this.item.remove();
    }
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    const pt = this.snapToGrid.snap(event.point);
    this.createConnectionPoint(pt);
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    if (!this.connectionPoint) {
      throw new Error("connectionPoint missing");
    }

    const pt = this.snapToGrid.snap(event.point);
    this.createConnectionPoint(pt);
    this.saveConnectionPoint();
    this.connectionPoint = null;
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    const pt = this.snapToGrid.snap(event.point);
    this.createConnectionPoint(pt);
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    if (!this.connectionPoint) {
      throw new Error("connectionPoint missing");
    }

    const pt = this.snapToGrid.snap(event.point);
    this.createConnectionPoint(pt);
  };

  private createConnectionPoint(pt: Paper.Point) {
    if (!this.connectionPoint) {
      this.connectionPoint = new GraphicConnectionPoint(pt);
      this.item = this.connectionPoint.paperDraw();
    } else {
      this.connectionPoint.pt = pt;
      this.item = this.connectionPoint.paperDraw();
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
