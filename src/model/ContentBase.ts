import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";
import deepClone from "../common/deepClone";

type ContentTypes =
  | "symbolref"
  | "symbol"
  | "group"
  | "line"
  | "circle"
  | "rect";

class ContentBase {
  type: ContentTypes;

  constructor(type: ContentTypes) {
    this.type = type;
  }

  clone(): ContentBase {
    return deepClone(this);
  }

  toJSON(): object {
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

  translate(pt: Point): ContentBase {
    return this;
  }
}

/*
  canvas  Text  color is set by context.fillStyle

                bounding-box .width   context.measureText(str)
*/

export default ContentBase;
