import Point from "../../common/point";
import Arc from "../../common/arc";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";
import Box from "../../common/box";
import Placement, { DrawOptions } from "../Placement";
import Paper from "paper";

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

  paperDraw() {
    const circle = new Paper.Path.Circle(
      new Paper.Point([this.pt.x, this.pt.y]),
      this.radius,
    );
    circle.strokeColor = "black";
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

  translate(pt: Point): GraphicCircle {
    const circle = deepClone(this);
    circle.pt = circle.pt.add(pt);
    return circle;
  }
}

export default GraphicCircle;
