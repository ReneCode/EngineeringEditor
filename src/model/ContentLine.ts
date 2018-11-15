import ContentBase from "./ContentBase";
import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";
import Line from "../common/line";
import deepClone from "../common/deepClone";

class ContentLine extends ContentBase {
  p1: Point;
  p2: Point;
  constructor(p1: Point, p2: Point) {
    super("line");
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  // http://choly.ca/post/typescript-json/
  toJSON(): object {
    const result = (<any>Object).assign({}, super.toJSON(), {
      p1: this.p1.toJSON(),
      p2: this.p2.toJSON(),
    });
    return result;
  }

  static fromJSON(json: any): ContentLine {
    if (json.type !== "line") {
      throw new Error("bad json type:" + json.type);
    }
    const line = Object.create(ContentLine.prototype);
    return (<any>Object).assign(line, json, {
      p1: Point.fromJSON(json.p1),
      p2: Point.fromJSON(json.p2),
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    const line = new Line(this.p1, this.p2);
    return line.nearPoint(pt, radius);
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ): void {
    context.beginPath();
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
}

export default ContentLine;
