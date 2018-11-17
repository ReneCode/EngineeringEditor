import Point from "../../common/point";
import GraphicBase from "./GraphicBase";
import Arc from "../../common/arc";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";

class GraphicCircle extends GraphicBase {
  pt: Point;
  radius: number;

  constructor(pt: Point, radius: number) {
    super("circle");
    this.pt = pt || new Point(0, 0);
    this.radius = radius || 0;
  }

  toJSON(asContent: boolean = false): object {
    const result = (<any>Object).assign({}, this, {
      pt: this.pt.toJSON(),
    });
    return result;
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

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ): void {
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