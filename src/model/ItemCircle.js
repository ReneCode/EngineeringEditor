import ItemBase from "./ItemBase";
import ItemTypes from "./ItemTypes";

class ItemCircle extends ItemBase {
  constructor(x, y, radius) {
    super(ItemTypes.circle);
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 0;
  }

  translate(pt) {
    return new ItemCircle(this.x + pt.x, this.y + pt.y, this.radius);
  }
}

export default ItemCircle;
