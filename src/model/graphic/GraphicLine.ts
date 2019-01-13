import Point from "../../common/point";
import Line from "../../common/line";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";
import Box from "../../common/box";
import Placement from "../Placement";

class GraphicLine extends Placement {
  p1: Point;
  p2: Point;
  constructor(p1: Point, p2: Point) {
    super("line");
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  static fromJSON(json: any): GraphicLine {
    const line = Object.create(GraphicLine.prototype);
    return (<any>Object).assign(line, json, {
      p1: Point.fromJSON(json.p1),
      p2: Point.fromJSON(json.p2),
    });
  }

  pickable(): boolean {
    return this.layer !== "autoconnect";
  }

  nearPoint(pt: Point, radius: number): boolean {
    const line = new Line(this.p1, this.p2);
    return line.nearPoint(pt, radius);
  }

  insideBox(box: Box): boolean {
    const line = new Line(this.p1, this.p2);
    return box.isLineInside(line);
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ): void {
    if (this.color) {
      context.strokeStyle = this.color;
    }

    context.beginPath();
    if (this.layer === "autoconnect") {
      context.strokeStyle = "#e11";
    }
    const p1 = transform.wcToCanvas(this.p1);
    context.moveTo(p1.x, p1.y);
    const p2 = transform.wcToCanvas(this.p2);
    context.lineTo(p2.x, p2.y);
    context.stroke();
  }

  translate(pt: Point) {
    const line = deepClone(this);
    line.p1 = line.p1.add(pt);
    line.p2 = line.p2.add(pt);
    return line;
  }

  getBoundingBox(): Box {
    return new Box(this.p1, this.p2);
  }
}

export default GraphicLine;
