import Point from "../../common/point";
import Line from "../../common/line";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";
import Box from "../../common/box";
import Placement, { DrawOptions } from "../Placement";

class GraphicPolygon extends Placement {
  points: Point[] = [];
  constructor() {
    super("polygon");
  }

  static fromJSON(json: any): GraphicPolygon {
    const polygon = Object.create(GraphicPolygon.prototype);
    return (<any>Object).assign(polygon, json, {
      points: json.points.map((p: any) => Point.fromJSON(p)),
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    const len = this.points.length;
    for (let i = 0; i < len - 1; i++) {
      const line = new Line(this.points[i], this.points[i + 1]);
      const near = line.nearPoint(pt, radius);
      if (near) {
        return true;
      }
    }
    return false;
  }

  insideBox(box: Box): boolean {
    const len = this.points.length;
    for (let i = 0; i < len - 1; i++) {
      const line = new Line(this.points[i], this.points[i + 1]);
      if (box.isLineInside(line)) {
        return true;
      }
    }
    return false;
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
    options: DrawOptions,
  ): void {
    this.drawWithOptions(context, options);

    context.beginPath();
    const len = this.points.length;
    for (let i = 0; i < len; i++) {
      const p = transform.wcToCanvas(this.points[i]);
      if (i === 0) {
        context.moveTo(p.x, p.y);
      } else {
        context.lineTo(p.x, p.y);
      }
    }
    context.stroke();
  }

  translate(pt: Point) {
    const polygon: GraphicPolygon = deepClone(this);
    polygon.points = polygon.points.map(p => p.add(pt));
    return polygon;
  }

  getBoundingBox(): Box {
    let box = new Box(this.points[0], this.points[0]);
    this.points.forEach(pt => {
      box = box.expandByPoint(pt);
    });
    return box;
  }

  // first and last point are equal
  closed(): boolean {
    const len = this.points.length;
    if (len < 2) {
      return false;
    }
    return this.points[len - 1].equal(this.points[0]);
  }
}

export default GraphicPolygon;
