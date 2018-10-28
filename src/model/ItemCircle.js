import ItemBase from "./ItemBase";
import ItemTypes from "./ItemTypes";
import Point from "../common/Point";

class ItemCircle extends ItemBase {
  constructor(pt, radius) {
    super(ItemTypes.circle);
    this.pt = pt || new Point(0, 0);
    this.radius = radius || 0;
  }

  translate(pt) {
    return new ItemCircle(this.p + pt, this.radius);
  }
}

export default ItemCircle;
