import React from "react";
import Paper, { Point } from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { connect } from "react-redux";
import configuration from "../configuration";
import { createElementAction } from "../../actions/changeElementActions";
import GraphicArc from "../../model/graphic/GraphicArc";
import { snapEvent } from "../SnapToGrid";

interface IProps {
  dispatch: Function;
}
class IacCreateArc extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private firstPoint: Paper.Point = new Paper.Point(0, 0);
  private arc: GraphicArc | null = null;
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
    const pt = snapEvent(event);
    console.log("mm:", pt);
    this.createArc(pt, 50);
  };

  onMouseDown = (event: Paper.MouseEvent) => {
    const pt = snapEvent(event);
    this.firstPoint = pt;
    this.createArc(pt, 50);
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    const pt = snapEvent(event);
    if (this.firstPoint.equals(pt)) {
      appEventDispatcher.dispatch("stopInteraction");
      return;
    }

    const radius = pt.subtract(this.firstPoint).length;
    this.createArc(this.firstPoint, radius);
    this.saveArc();
    this.arc = null;
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    const pt = snapEvent(event);
    const radius = pt.subtract(this.firstPoint).length;

    this.createArc(this.firstPoint, radius);
  };

  private createArc(p1: Point, radius: number) {
    if (!this.arc) {
      this.arc = new GraphicArc(p1, radius);
      this.arc.color = configuration.defaultStrokeColor;
      this.arc.fill = configuration.defaultFillColor;
      this.item = this.arc.paperDraw();
    } else {
      this.arc.center = p1;
      this.arc.radius = radius;

      this.item.remove();
      this.item = this.arc.paperDraw();
    }
  }

  private async saveArc() {
    if (!this.arc) {
      throw new Error("arc missing");
    }

    await this.props.dispatch(
      createElementAction("placement", this.arc),
    );
  }

  render() {
    return null;
  }
}

export default connect()(IacCreateArc);
