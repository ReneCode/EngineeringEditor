import ItemBase from "./ItemBase";
import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";

class ItemLine extends ItemBase {
  p1: Point;
  p2: Point;
  constructor(pageId: string, p1: Point, p2: Point) {
    super(pageId, "line");
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  // http://choly.ca/post/typescript-json/
  toJSON(): object {
    return (<any>Object).assign({}, this, {
      p1: this.p1.toJSON(),
      p2: this.p2.toJSON(),
    });
  }

  static fromJSON(json: any): ItemLine {
    if (json.type !== "line") {
      throw new Error("bad json type:" + json.type);
    }
    const line = Object.create(ItemLine.prototype);
    return (<any>Object).assign(line, json, {
      p1: Point.fromJSON(json.p1),
      p2: Point.fromJSON(json.p2),
    });
  }

  translate(pt: Point) {
    return new ItemLine(
      this.pageId,
      this.p1.add(pt),
      this.p2.add(pt),
    );
  }

  draw(context: any, transform: TransformCoordinate) {
    context.lineWidth = 1;
    const p1 = transform.wcToCanvas(this.p1);
    context.moveTo(p1.x, p1.y);
    const p2 = transform.wcToCanvas(this.p2);
    context.lineTo(p2.x, p2.y);
  }
}

export default ItemLine;
