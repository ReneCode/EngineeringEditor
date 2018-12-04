import GraphicBase from "./graphic/GraphicBase";
import { IdType } from "./types";
import GraphicFactory from "./graphic/GraphicFactory";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import { decodeJson, encodeJson, DtoPlacement } from "./dtoUtil";

class Placement {
  id: IdType;
  pageId: IdType;
  projectId: IdType;
  graphic: GraphicBase;
  // logic: LogicBase;  // device

  constructor(
    projectId: IdType,
    pageId: IdType,
    graphic: GraphicBase,
  ) {
    this.projectId = projectId;
    this.pageId = pageId;
    this.graphic = graphic;
    this.id = "";
  }

  toDTO(): DtoPlacement {
    const graphicJson = this.graphic.toJSON();
    return {
      projectId: this.projectId,
      pageId: this.pageId,
      id: this.id,
      graphic: encodeJson(graphicJson),
    };
  }

  static fromDTO(json: DtoPlacement): Placement | Array<Placement> {
    if (Array.isArray(json)) {
      return json.map((item: any) => {
        return <Placement>Placement.fromDTO(item);
      });
    }

    const jsonGraphic = decodeJson(json.graphic);
    const graphic = <GraphicBase>GraphicFactory.fromJSON(jsonGraphic);
    const placement = new Placement(
      json.projectId,
      json.pageId,
      graphic,
    );
    placement.id = json.id;
    return placement;
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    this.graphic.draw(context, transform);
  }

  nearPoint(pt: Point, radius: number): boolean {
    return this.graphic.nearPoint(pt, radius);
  }

  translate(pt: Point) {
    const placement = new Placement(
      this.projectId,
      this.pageId,
      this.graphic.translate(pt),
    );
    placement.id = this.id;
    return placement;
  }
}

export default Placement;
