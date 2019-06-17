import React from "react";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import { connect } from "react-redux";
import { DispatchFunction } from "../../actions/action";

interface IProps {
  dispatch: DispatchFunction;
}

class IacRectangle extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  private rectangle: Paper.Path | null = null;

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
    this.createRectangle();
  };

  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    if (!this.rectangle) {
      throw new Error("rectangle missing");
    }
    this.createRectangle();

    // this.saveRectangle(this.firstPoint, event.point);
    this.rectangle = null;
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (!this.rectangle) {
      throw new Error("rectangle missing");
    }

    this.createRectangle();
  };

  private createRectangle() {
    //   if (this.rectangle) {
    //     this.rectangle.remove();
    //   }
    //   const rect = new Paper.Rectangle(this.firstPoint, secondPoint);
    //   this.rectangle = new Paper.Path.Rectangle(rect);
    //   this.rectangle.strokeColor = configuration.defaultStrokeColor;
    //   this.rectangle.strokeWidth = 1;
    //   this.rectangle.fillColor = configuration.defaultFillColor;
    // }
    // async saveRectangle(p1: Paper.Point, p2: Paper.Point) {
    //   const box = new Box(new Point(p1.x, p1.y), new Point(p2.x, p2.y));
    //   const polygon = new GraphicPolygon();
    //   polygon.points = [
    //     box.topRight(),
    //     box.bottomRight(),
    //     box.bottomLeft(),
    //     box.topLeft(),
    //     box.topRight(),
    //   ];
    //   polygon.color = configuration.defaultStrokeColor;
    //   polygon.fill = configuration.defaultFillColor;
    //   await this.props.dispatch(
    //     createElementAction("placement", polygon),
    //   );
  }

  render() {
    return null;
  }
}

export default connect()(IacRectangle);
