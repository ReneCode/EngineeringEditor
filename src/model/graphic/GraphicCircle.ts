import Point from "../../common/point";
import Arc from "../../common/arc";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";
import Box from "../../common/box";
import Placement, { DrawOptions } from "../Placement";
import Paper from "paper";
import ResizeBox from "../../common/interaction/ResizeBox";

class GraphicCircle extends Placement {
  pt: Point;
  radius: number;

  constructor(pt: Point, radius: number) {
    super("circle");
    this.pt = pt || new Point(0, 0);
    this.radius = radius || 0;
  }

  static fromJSON(json: any): GraphicCircle {
    const line = Object.create(GraphicCircle.prototype);
    return (<any>Object).assign(line, json, {
      pt: Point.fromJSON(json.pt),
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    const arc = new Arc(this.pt, this.radius);
    return arc.nearPoint(pt, radius);
  }

  insideBox(box: Box): boolean {
    const bbox = this.getBoundingBox();
    return box.intersect(bbox);
  }

  getBoundingBox(): Box {
    return new Box(
      new Point(this.pt.x - this.radius, this.pt.y - this.radius),
      new Point(this.pt.x + this.radius, this.pt.y + this.radius),
    );
  }

  paperDraw(): Paper.Item {
    const circle = new Paper.Path.Circle(
      new Paper.Point([this.pt.x, this.pt.y]),
      this.radius,
    );
    this.paperSetStyle(circle);
    return circle;
  }

  getGeometyFromHandles(handles: Paper.Item[]): any {
    const width = Math.abs(
      handles[1].position.x - handles[2].position.x,
    );
    const height = Math.abs(
      handles[0].position.y - handles[1].position.y,
    );
    const cx =
      Math.min(handles[1].position.x, handles[2].position.x) +
      width / 2;
    const cy =
      Math.min(handles[1].position.y, handles[0].position.y) +
      height / 2;
    return { cx, cy, width, height };
  }

  paperDrawFromResizeBox(resizeBox: ResizeBox): Paper.Item {
    const handles = resizeBox.getHandles();
    const { cx, cy, width, height } = this.getGeometyFromHandles(
      handles,
    );
    const circle = new Paper.Path.Circle(
      new Paper.Point(cx, cy),
      height / 2,
    );
    this.paperSetStyle(circle);
    return circle;
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
    options: DrawOptions,
  ): void {
    this.drawWithOptions(context, options);

    context.beginPath();
    // context.fillStyle = "rgba(50,100,50,0.9)";
    const pt = transform.wcToCanvas(this.pt);
    const r = transform.wcLengthToCanvas(this.radius);
    context.arc(pt.x, pt.y, r, 0, 2 * Math.PI);
    // context.fill();
    context.stroke();
  }

  // translate(pt: Point): GraphicCircle {
  //   const circle = deepClone(this);
  //   circle.pt = circle.pt.add(pt);
  //   return circle;
  // }

  // fitToRect(rectangle: Paper.Rectangle): GraphicCircle {
  //   const circle = deepClone(this);
  //   circle.pt = new Point(rectangle.center.x, rectangle.center.y);
  //   circle.radius = rectangle.width / 2;
  //   return circle;
  // }

  updateFromHandles(handles: Paper.Item[]): Placement {
    const circle = deepClone(this);
    const { cx, cy, width, height } = this.getGeometyFromHandles(
      handles,
    );
    circle.pt = new Point(cx, cy);
    circle.radius = height / 2;
    return circle;
  }
}

export default GraphicCircle;
