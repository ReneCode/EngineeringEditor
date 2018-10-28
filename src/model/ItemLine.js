import ItemBase from "./ItemBase";
import ItemTypes from "./ItemTypes";
import Point from "../common/Point";

class ItemLine extends ItemBase {
  constructor(pageId, p1, p2) {
    super(pageId, ItemTypes.line);
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  translate(pt) {
    return new ItemLine(this.pageId, this.p1 + pt, this.p2 + pt);
  }
}

export default ItemLine;
