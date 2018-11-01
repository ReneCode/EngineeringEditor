import ItemBase from "./ItemBase";
import Point from "../common/point";

class ItemCircle extends ItemBase {
  pt: Point;
  radius: number;

  constructor(pageId: string, pt: Point, radius: number) {
    super(pageId, "circle");
    this.pt = pt || new Point(0, 0);
    this.radius = radius || 0;
  }

  // http://choly.ca/post/typescript-json/
  toJSON(): object {
    return (<any>Object).assign({}, this, {
      pt: this.pt.toJSON(),
    });
  }

  static fromJSON(json: any): ItemCircle {
    if (json.type !== "circle") {
      throw new Error("bad json type:" + json.type);
    }
    const line = Object.create(ItemCircle.prototype);
    return (<any>Object).assign(line, json, {
      pt: Point.fromJSON(json.pt),
    });
  }

  translate(pt: Point): ItemCircle {
    return new ItemCircle(this.pageId, this.pt.add(pt), this.radius);
  }
}

export default ItemCircle;
