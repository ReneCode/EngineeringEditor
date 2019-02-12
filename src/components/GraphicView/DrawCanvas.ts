import { Component } from "react";
import TransformCoordinate from "../../common/transformCoordinate";
import { IGraphicState } from "../../reducers/graphicReducer";
import Placement from "../../model/Placement";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import Point from "../../common/point";
import GraphicRect from "../../model/graphic/GraphicRect";

interface IProps {
  getCanvas(): HTMLCanvasElement;

  graphic: IGraphicState;
}

class DrawCanvas extends Component<IProps> {
  state = {
    cursorPoint: new Point(),
  };

  componentDidUpdate() {
    this.redraw();
  }

  async componentDidMount() {
    const canvas = this.props.getCanvas();
    if (canvas) {
      canvas.addEventListener("mousemove", this.onMouseMove);
    }
  }

  componentWillUnmount() {
    const canvas = this.props.getCanvas();
    if (canvas) {
      canvas.removeEventListener("mousemove", this.onMouseMove);
    }
  }

  onMouseMove = (ev: MouseEvent) => {
    const pt = this.getCursor(ev);
    this.setState({ cursorPoint: pt });
  };

  getCursor = (ev: MouseEvent) => {
    const {
      top,
      left,
    } = this.props.getCanvas().getBoundingClientRect();
    return new Point(ev.clientX - left, ev.clientY - top);
  };

  redraw = () => {
    const transform = new TransformCoordinate(
      this.props.graphic.viewport,
      this.props.graphic.canvas,
    );
    this.draw(transform);
  };

  draw = (transform: TransformCoordinate) => {
    const canvas = this.props.getCanvas();
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    const items = this.props.graphic.items;
    const selectedItems = this.props.graphic.selectedItems;
    const tempItems = this.props.graphic.tempItems;

    // only draw such itmes that are NOT in the selected list
    items.forEach(item => {
      if (!selectedItems.find((i: Placement) => i.id === item.id)) {
        context.save();
        item.draw(context, transform);
        context.restore();
      }
    });

    // selected items
    selectedItems.forEach((item: Placement) => {
      context.save();
      // context.setLineDash([5, 5]);
      item.draw(context, transform, { mode: "selected" });
      context.restore();
    });

    // temp items
    context.save();
    context.strokeStyle = "rgba(20,20,20,0.6)";
    context.fillStyle = "rgba(20,20,20,0.1)";
    context.lineWidth = 1;
    tempItems.forEach(item => {
      context.save();
      item.draw(context, transform, { mode: "temp" });
      context.restore();
    });
    context.restore();

    // this.drawViewport(context, transform);

    this.drawCursor(context, transform);
  };

  drawViewport(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    const { viewport } = this.props.graphic;
    const rect = new GraphicRect(
      new Point(viewport.x, viewport.y),
      new Point(
        viewport.x + viewport.width,
        viewport.y + viewport.height,
      ),
    );
    rect.color = "red";
    rect.draw(context, transform);
  }

  drawCursor(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    const { radiusScreen, mode } = this.props.graphic.cursor;

    let pt = transform.canvasToWc(this.state.cursorPoint);
    if (this.props.graphic.canvas.useGrid) {
      pt = pt.snap(
        this.props.graphic.canvas.gridX,
        this.props.graphic.canvas.gridY,
      );
    }
    pt = transform.wcToCanvas(pt);

    context.save();
    context.beginPath();
    context.strokeStyle = "rgba(0,0,0,0.3)";
    switch (mode) {
      case "select":
        context.fillStyle = "rgba(68,68,85,0.2)";
        context.arc(pt.x, pt.y, radiusScreen, 0, 2 * Math.PI);
        break;
      case "delete":
        context.fillStyle = "rgba(185,0,0,0.2)";
        context.arc(pt.x, pt.y, radiusScreen, 0, 2 * Math.PI);
        break;
      default:
    }
    context.moveTo(pt.x - radiusScreen * 3, pt.y);
    context.lineTo(pt.x + radiusScreen * 3, pt.y);
    context.moveTo(pt.x, pt.y - radiusScreen * 3);
    context.lineTo(pt.x, pt.y + radiusScreen * 3);
    context.fill();
    context.stroke();
    context.restore();
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    graphic: state.graphic,
  };
};

export default connect(mapStateToProps)(DrawCanvas);
