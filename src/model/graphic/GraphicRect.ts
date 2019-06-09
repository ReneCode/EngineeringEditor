import Paper from "paper";
import Placement from "../Placement";
import PaperUtil from "../../utils/PaperUtil";

class GraphicRect extends Placement {
  constructor(public p1: Paper.Point, public p2: Paper.Point) {
    super("rect");
  }

  static fromJSON(json: any): GraphicRect {
    const rect = Object.create(GraphicRect.prototype);
    return Object.assign(rect, json, {
      p1: PaperUtil.PointFromJSON(json.p1),
      p2: PaperUtil.PointFromJSON(json.p2),
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      p1: PaperUtil.PointToJSON(this.p1),
      p2: PaperUtil.PointToJSON(this.p2),
    };
  }

  /*
  nearPoint(pt: Point, radius: number): boolean {
    const line = new Line(this.p1, this.p2);
    return line.nearPoint(pt, radius);
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ): void {
    if (this.color) {
      context.strokeStyle = this.color;
    }

    context.beginPath();
    const p1 = transform.wcToCanvas(this.p1);
    const p2 = transform.wcToCanvas(this.p2);
    context.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    context.stroke();
  }

  translate(pt: Paper.Point) {
    const line = deepClone(this);
    line.p1 = line.p1.add(pt);
    line.p2 = line.p2.add(pt);
    return line;
  }
  */
}

export default GraphicRect;
