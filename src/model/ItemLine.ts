import ItemBase from "./ItemBase";
import Point from "../common/point";

class ItemLine extends ItemBase {
  p1: Point;
  p2: Point;
  constructor(pageId: string, p1: Point, p2: Point) {
    super(pageId, "line");
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  translate(pt: Point) {
    return new ItemLine(
      this.pageId,
      this.p1.add(pt),
      this.p2.add(pt),
    );
  }
}

export default ItemLine;
