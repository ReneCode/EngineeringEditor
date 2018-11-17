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
  id: string;
  pageId: string;
  projectId: string;
  type: ItemTypes;

  constructor(pageId: string, type: ItemTypes) {
    this.projectId = "";
    this.pageId = pageId;
    this.type = type;
    this.id = "";
  }

  clone(): ItemBase {
    return deepClone(this);
  }

  static getContent(json: any): any | null {
    if (json.content) {
      return JSON.parse(json.content);
    } else {
      return null;
    }
  }

  static setContent(json: any, content: any) {
    json.content = JSON.stringify(content);
  }

  static deleteContent(json: any) {
    delete json.content;
  }

  toJSON(asContent: Boolean = false): object {
    const result: any = (<any>Object).assign({}, this);
    return result;
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
