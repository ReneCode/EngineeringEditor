import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";
import deepClone from "../common/deepClone";

type ItemTypes = "list" | "line" | "circle" | "rect";

class ItemBase {
  id: number;
  pageId: string;
  type: ItemTypes;

  constructor(pageId: string, type: ItemTypes) {
    this.pageId = pageId;
    this.type = type;
    this.id = 0;
  }

  clone(): ItemBase {
    return deepClone(this);
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

/*
  canvas  Text  color is set by context.fillStyle

                bounding-box .width   context.measureText(str)
*/

export default ItemBase;
