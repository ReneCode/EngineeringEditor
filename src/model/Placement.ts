import { IdType, GraphicType, LayerType } from "./types";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import { encodeJson, DtoPlacement } from "./dtoUtil";
import Box from "../common/box";

class Placement {
  type: GraphicType;
  id: IdType;
  pageId: IdType;
  projectId: IdType;
  color: string | undefined;
  layer: LayerType = undefined;

  constructor(type: GraphicType) {
    this.type = type;
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    throw new Error("draw has to be overwritten by:" + this);
  }

  nearPoint(pt: Point, radius: number): boolean {
    throw new Error("nearPoint has to be overwritten by:" + this);
  }

  insideBox(box: Box): boolean {
    throw new Error("insideBox has to be overwritten by:" + this);
  }

  translate(pt: Point) {
    throw new Error("translate has to be overwritten by:" + this);
  }

  // translate(pt: Point) {
  //   const placement = new Placement(
  //     this.projectId,
  //     this.pageId,
  //     this.graphic.translate(pt),
  //   );
  //   placement.id = this.id;
  //   return placement;
  // }
}

export default Placement;
