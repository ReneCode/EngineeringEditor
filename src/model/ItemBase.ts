// import ItemTypes from "./ItemTypes";
import Point from "../common/point";

type ItemTypes = "list" | "line" | "circle" | "rect";

class ItemBase {
  pageId: string;
  type: ItemTypes;

  constructor(pageId: string, type: ItemTypes) {
    this.pageId = pageId;
    this.type = type;
  }

  toJSON(): object {
    return (<any>Object).assign({}, this);
  }

  translate(pt: Point): ItemBase {
    return this;
  }
}

export default ItemBase;
