import { GraphicType } from "../types";
import TransformCoordinate from "../../common/transformCoordinate";
import Point from "../../common/point";
import Box from "../../common/box";

class GraphicBase {
  type: GraphicType;

  constructor(type: GraphicType) {
    this.type = type;
  }

  // will be overwritten by class that extends this class
  toJSON(): object {
    throw new Error("extend from GraphicBase");
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    throw new Error("extend from GraphicBase");
  }

  nearPoint(pt: Point, radius: number): boolean {
    throw new Error("extend from GraphicBase");
  }

  insideBox(box: Box): boolean {
    console.log("insideBox missing for:", this);
    return false;
  }

  translate(pt: Point): GraphicBase {
    throw new Error("extend from GraphicBase");
  }
}

export default GraphicBase;
