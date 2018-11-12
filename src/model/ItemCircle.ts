import ItemBase from "./ItemBase";
import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";
import Arc from "../common/arc";
import deepClone from "../common/deepClone";

class ItemCircle extends ItemBase {
  pt: Point;
  radius: number;

  constructor(pageId: string, pt: Point, radius: number) {
    super(pageId, "circle");
    this.pt = pt || new Point(0, 0);
    this.radius = radius || 0;
  }

  // http://choly.ca/post/typescript-json/
  toJSON(asContent: boolean = false): object {
    const result = (<any>Object).assign({}, super.toJSON(), {
      pt: this.pt.toJSON(),
    });
    if (asContent) {
      const content = {
        pt: result.pt,
        radius: result.radius,
      };
      ItemBase.setContent(result, content);
      delete result.pt;
      delete result.radius;
    }
    return result;
  }

  static fromJSON(json: any): ItemCircle {
    if (json.type !== "circle") {
      throw new Error("bad json type:" + json.type);
    }
    const line = Object.create(ItemCircle.prototype);
    const content = ItemBase.getContent(json);
    if (content) {
      json.pt = content.pt;
      json.radius = content.radius;
      ItemBase.deleteContent(json);
    }
    return (<any>Object).assign(line, json, {
      pt: Point.fromJSON(json.pt),
    });
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

  nearPoint(pt: Point, radius: number): boolean {
    const arc = new Arc(this.pt, this.radius);
    return arc.nearPoint(pt, radius);
  }

  translate(pt: Point): ItemCircle {
    const circle = deepClone(this);
    circle.pt = circle.pt.add(pt);
    return circle;
  }
}

export default ItemCircle;
