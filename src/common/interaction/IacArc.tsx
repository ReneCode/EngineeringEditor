import React, { createElement } from "react";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import { connect } from "react-redux";
import configuration from "../configuration";
import PaperPlacement from "../../model/graphic/PaperPlacement";
import { createElementAction } from "../../actions/changeElementActions";

interface IProps {
  dispatch: Function;
}
class IacArc extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private firstPoint: Paper.Point = new Paper.Point(0, 0);
  private arc: Paper.Path | null = null;

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
    if (this.arc) {
      this.arc.remove();
    }

    const radius = p2.subtract(this.firstPoint).length;
    this.arc = new Paper.Path.Circle(this.firstPoint, radius);
    this.arc.strokeColor = configuration.defaultStrokeColor;
    this.arc.fillColor = configuration.defaultFillColor;
  }

  private async saveArc() {
    if (!this.arc) {
      throw new Error("arc missing");
    }

    const paperPlacement = new PaperPlacement(this.arc);
    await this.props.dispatch(
      createElementAction("placement", paperPlacement),
    );
  }

  render() {
    return null;
  }
}

export default connect()(IacArc);
