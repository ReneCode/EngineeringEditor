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

  translate(pt: Point): ItemCircle {
    return new ItemCircle(this.pageId, this.pt.add(pt), this.radius);
  }
}

export default ItemCircle;
