import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";
import deepClone from "../common/deepClone";

type ItemTypes =
  | "symbolref"
  | "symbol"
  | "group"
  | "line"
  | "circle"
  | "rect";

class ItemBase {
  id: number;
  pageId: string;
  projectId: string;
  type: ItemTypes;

  constructor(pageId: string, type: ItemTypes) {
    this.projectId = "";
    this.pageId = pageId;
    this.type = type;
    this.id = 0;
  }

  clone(): ItemBase {
    return deepClone(this);
  }

  toJSON(): object {
    const result: any = (<any>Object).assign({}, this);
    // if (!this.pageId) {
    //   delete result.pageId;
    // }
    // if (!this.id) {
    //   delete result.id;
    // }
    return result;
  }

  // static fromJSON(json: any): ItemBase {
  //   const baseItem = Object.create(ItemBase.prototype);
  //   if (json.id) {
  //     baseItem.id = json.id;
  //   }
  //   if (json.pageId) {
  //     baseItem.pageId = json.pageId;
  //   }
  //   baseItem.type = json.type;
  //   return baseItem;
  // }

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
