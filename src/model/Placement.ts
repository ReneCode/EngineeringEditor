import GraphicBase from "./graphic/GraphicBase";
import { IdType, GraphicType } from "./types";
import GraphicFactory from "./graphic/GraphicFactory";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import { decodeJson, encodeJson, DtoPlacement } from "./dtoUtil";
import Box from "../common/box";

class Placement {
  type: GraphicType = "";
  id: IdType = "";
  pageId: IdType = "";
  projectId: IdType = "";

  constructor(type: GraphicType) {
    this.type = type;
  }

  // must be overwritten
  toJSON(): any {
    return {};
  }

  toDTO(): DtoPlacement {
    const json = this.toJSON();
    delete json.id;
    delete json.pageId;
    delete json.projectId;
    return {
      projectId: this.projectId,
      pageId: this.pageId,
      id: this.id,
      type: this.type,
      content: encodeJson(json),
    };
  }

  // static fromDTO(json: DtoPlacement): Placement | Array<Placement> {
  //   if (Array.isArray(json)) {
  //     return json.map((item: any) => {
  //       return <Placement>Placement.fromDTO(item);
  //     });
  //   }

  //   const jsonGraphic = decodeJson(json.content);
  //   const graphic = <GraphicBase>GraphicFactory.fromJSON(jsonGraphic);
  //   const placement = new Placement(
  //     json.projectId,
  //     json.pageId,
  //     graphic,
  //   );
  //   placement.id = json.id;
  //   return placement;
  // }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    throw new Error("draw has to be overwritten by:" + this);
  }

  nearPoint(pt: Point, radius: number): boolean {
    throw new Error("draw has to be overwritten by:" + this);
  }

  insideBox(box: Box): boolean {
    throw new Error("draw has to be overwritten by:" + this);
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
