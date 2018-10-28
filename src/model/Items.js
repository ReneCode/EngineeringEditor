import BaseItem from "./BaseItem";

class LineItem extends BaseItem {
  constructor(x1, y1, x2, y2) {
    super("line");
    this.x1 = x1 || 0;
    this.y1 = y1 || 0;
    this.x2 = x2 || 0;
    this.y2 = y2 || 0;
  }
}

export { LineItem };
