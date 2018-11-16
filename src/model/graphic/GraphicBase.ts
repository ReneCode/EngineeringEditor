import { GraphicType } from "../types";
import TransformCoordinate from "../../common/transformCoordinate";
import Point from "../../common/point";

class GraphicBase {
  type: GraphicType;

  constructor(type: GraphicType) {
    this.type = type;
  }

  // will be overwritten by class that extends this class
  toJSON(): object {
    return {};
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {}

  nearPoint(pt: Point, radius: number): boolean {
    return false;
  }

  translate(pt: Point): GraphicBase {
    return this;
  }
}

export default GraphicBase;
