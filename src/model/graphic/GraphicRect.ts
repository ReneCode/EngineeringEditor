import GraphicBase from "./GraphicBase";
import Point from "../../common/point";
import Line from "../../common/line";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";

class GraphicRect extends GraphicBase {
  p1: Point;
  p2: Point;
  constructor(p1: Point, p2: Point) {
    super("rect");
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  toJSON(): object {
    const result = (<any>Object).assign({}, this, {
      p1: this.p1.toJSON(),
      p2: this.p2.toJSON(),
    });
    return result;
  }

  static fromJSON(json: any): GraphicRect {
    const line = Object.create(GraphicRect.prototype);
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
    const p2 = transform.wcToCanvas(this.p2);
    context.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    context.stroke();
  }

  translate(pt: Point) {
    const line = deepClone(this);
    line.p1 = line.p1.add(pt);
    line.p2 = line.p2.add(pt);
    return line;
  }
}

export default GraphicRect;
