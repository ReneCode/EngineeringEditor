import ItemBase from "./ItemBase";
import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";
import Line from "../common/line";
import deepClone from "../common/deepClone";

class ItemLine extends ItemBase {
  p1: Point;
  p2: Point;
  constructor(pageId: string, p1: Point, p2: Point) {
    super(pageId, "line");
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  // http://choly.ca/post/typescript-json/
  toJSON(asContent: boolean = false): object {
    const result = (<any>Object).assign({}, super.toJSON(), {
      p1: this.p1.toJSON(),
      p2: this.p2.toJSON(),
    });
    if (asContent) {
      const content = {
        p1: result.p1,
        p2: result.p2,
      };
      ItemBase.setContent(result, content);
      delete result.p1;
      delete result.p2;
    }
    return result;
  }

  static fromJSON(json: any): ItemLine {
    if (json.type !== "line") {
      throw new Error("bad json type:" + json.type);
    }
    const line = Object.create(ItemLine.prototype);
    const content = ItemBase.getContent(json);
    if (content) {
      json.p1 = content.p1;
      json.p2 = content.p2;
      ItemBase.deleteContent(json);
    }
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

export default ItemLine;
