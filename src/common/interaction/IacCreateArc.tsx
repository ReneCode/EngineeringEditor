import React from "react";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import { connect } from "react-redux";
import configuration from "../configuration";
import { createElementAction } from "../../actions/changeElementActions";
import GraphicArc from "../../model/graphic/GraphicArc";

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
    this.createArc(this.firstPoint);
  };
  onMouseUp = async (type: AppEventType, event: Paper.MouseEvent) => {
    if (!this.arc) {
      throw new Error("arc missing");
    }
    this.createArc(event.point);
    this.saveArc();
    this.arc = null;
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (!this.arc) {
      throw new Error("arc missing");
    }

    this.createArc(event.point);
  };

  private createArc(p2: Paper.Point) {
    const radius = p2.subtract(this.firstPoint).length;
    if (!this.arc) {
      this.arc = new GraphicArc(this.firstPoint, radius);
      this.arc.color = configuration.defaultStrokeColor;
      this.arc.fill = configuration.defaultFillColor;

      this.item = this.arc.paperDraw();
    } else {
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
