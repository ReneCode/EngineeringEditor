import ItemBase from "./ItemBase";
import Point from "../common/point";

class ItemRect extends ItemBase {
  p1: Point;
  p2: Point;
  constructor(pageId: string, p1: Point, p2: Point) {
    super(pageId, "rect");
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  translate(pt: Point) {
    return new ItemRect(
      this.pageId,
      this.p1.add(pt),
      this.p2.add(pt),
    );
  }
}

export default ItemRect;
