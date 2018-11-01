// import ItemTypes from "./ItemTypes";
import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";

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

  nearPoint(pt: Point, radius: number): boolean {
    return false;
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {}

  translate(pt: Point): ItemBase {
    return this;
  }
}

export default ItemBase;
