import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";
import Box from "../../common/box";
import Placement from "../Placement";

const SIZE = 10;

class GraphicGrip extends Placement {
  constructor(private pt: Point) {
    super("connectionpoint");
    this.layer = "grip";
  }

  static fromJSON(json: any): GraphicGrip {
    const connectionPoint = Object.create(GraphicGrip.prototype);
    return (<any>Object).assign(connectionPoint, json, {
      pt: Point.fromJSON(json.pt),
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    return this.pt.sub(pt).length() <= radius;
  }

  insideBox(box: Box): boolean {
    return box.isPointInside(this.pt);
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ): void {
    context.save();
    context.beginPath();
    context.fillStyle = "rgba(50,50,50,0.6)";
    const pt = transform.wcToCanvas(this.pt);
    context.rect(pt.x - SIZE / 2, pt.y - SIZE / 2, SIZE, SIZE);
    context.fill();
    context.stroke();
    context.restore();
  }

  translate(pt: Point): GraphicGrip {
    const connectionPoint = deepClone(this);
    connectionPoint.pt = connectionPoint.pt.add(pt);
    return connectionPoint;
  }

  getBoundingBox(): Box {
    return new Box(this.pt, this.pt);
  }
}

export default GraphicGrip;
