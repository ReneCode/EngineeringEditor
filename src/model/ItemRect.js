import ItemBase from "./ItemBase";
import ItemTypes from "./ItemTypes";
import Point from "../common/point";

class ItemRect extends ItemBase {
  constructor(pageId, p1, p2) {
    super(pageId, ItemTypes.rect);
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  translate(pt) {
    return new ItemRect(this.pageId, this.p1 + pt, this.p2 + pt);
  }
}

export default ItemRect;
