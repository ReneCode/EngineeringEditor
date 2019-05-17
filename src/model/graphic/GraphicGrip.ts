import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";
import Box from "../../common/box";
import Placement from "../Placement";

const SIZE = 10;

class GraphicGrip {
  constructor(
    public pt: Point,
    public parent: Placement,
    public payload: any = undefined,
  ) {}

  draw(): void {}
}

export default GraphicGrip;
