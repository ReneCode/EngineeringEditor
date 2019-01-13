import Placement from "../Placement";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import Box from "../../common/box";
import deepClone from "../../common/deepClone";

class GraphicText extends Placement {
  pt: Point;
  text: string;
  font: string = "Arial";
  fontSize: number = 12;

  constructor(text: string, pt: Point) {
    super("text");
    this.text = text;
    this.pt = pt;
  }

  static fromJSON(json: any): GraphicText {
    const text = Object.create(GraphicText.prototype);
    return (<any>Object).assign(text, json, {
      pt: Point.fromJSON(json.pt),
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    return this.pt.sub(pt).length() <= radius;
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    context.save();
    context.fillStyle = "black";
    if (this.color) {
      context.fillStyle = this.color;
    }
    context.beginPath();

    const sizeCanvas = transform.wcLengthToCanvas(this.fontSize);

    context.font = `${sizeCanvas}px ${this.font}`;
    const ptCanvas = transform.wcToCanvas(this.pt);
    context.fillText(this.text, ptCanvas.x, ptCanvas.y);
    context.stroke();
    context.restore();
  }

  translate(pt: Point): GraphicText {
    const text = deepClone(this);
    text.pt = text.pt.add(pt);
    return text;
  }

  getBoundingBox(): Box {
    return new Box(this.pt, this.pt);
  }
}

export default GraphicText;
