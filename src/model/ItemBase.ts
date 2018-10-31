// import ItemTypes from "./ItemTypes";
import Point from "../common/point";

type ItemTypes = "line" | "circle" | "rect";

class BaseItem {
  pageId: string;
  type: ItemTypes;

  constructor(pageId: string, type: ItemTypes) {
    this.pageId = pageId;
    this.type = type;
  }

  translate(pt: Point): BaseItem {
    return this;
  }
}

export default BaseItem;
