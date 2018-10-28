import ItemBase from "./ItemBase";
import ItemTypes from "./ItemTypes";

class ItemLine extends ItemBase {
  constructor(x1, y1, x2, y2) {
    super(ItemTypes.line);
    this.x1 = x1 || 0;
    this.y1 = y1 || 0;
    this.x2 = x2 || 0;
    this.y2 = y2 || 0;
  }
}

export default ItemLine;
