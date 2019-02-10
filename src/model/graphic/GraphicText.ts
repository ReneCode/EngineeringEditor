import Placement, { DrawOptions } from "../Placement";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import Box from "../../common/box";
import deepClone from "../../common/deepClone";

class GraphicText extends Placement {
  pt: Point;
  text: string;
  font: string = "Arial";
  fontSize: number = 12;
  ref: string = "";

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
    options: DrawOptions = {},
  ) {
    context.save();
    context.fillStyle = "black";
    this.drawWithOptions(context, options);
    context.beginPath();

    const sizeCanvas = transform.wcLengthToCanvas(this.fontSize);
    const ptCanvas = transform.wcToCanvas(this.pt);
    let italic = "";
    let text = this.text;
    if (this.ref) {
      if (options && options.parent) {
        try {
          const obj = options.parent;
          text = obj[this.ref];
        } catch (e) {
          console.log(e);
        }
      } else {
        text = `ref#${this.ref}`;
        // italic = "italic";
      }
    }
    context.font = `${italic} ${sizeCanvas}px ${this.font}`;
    context.fillText(text, ptCanvas.x, ptCanvas.y);
    context.stroke();

    if (options.mode === "selected") {
      const textMetrics = context.measureText(this.text);
      context.beginPath();
      context.moveTo(ptCanvas.x, ptCanvas.y);
      context.lineTo(ptCanvas.x + textMetrics.width, ptCanvas.y);
      context.stroke();
    }

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

  insideBox(box: Box): boolean {
    return box.isPointInside(this.pt);
  }
}

export default GraphicText;
