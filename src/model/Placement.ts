import GraphicBase from "./graphic/GraphicBase";
import { IdType } from "./types";
import GraphicFactory from "./graphic/GraphicFactory";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";

interface PlacementJsonType {
  projectId: IdType;
  pageId: IdType;
  id: IdType;
  graphic: string;
}

// this could be zipped later
const encodeGraphic = (json: object): string => {
  return JSON.stringify(json);
};

const decodeGraphic = (str: string): object => {
  return JSON.parse(str);
};

// ----------

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

  toJSON(): PlacementJsonType {
    const result: PlacementJsonType = {
      projectId: this.projectId,
      pageId: this.pageId,
      id: this.id,
      graphic: "",
    };
    if (this.graphic) {
      const graphicJson = this.graphic.toJSON();
      result.graphic = encodeGraphic(graphicJson);
    }
    return result;
  }

  static fromJSON(
    json: PlacementJsonType,
  ): Placement | Array<Placement> {
    if (Array.isArray(json)) {
      return json.map((item: any) => {
        return <Placement>Placement.fromJSON(item);
      });
    }

    const jsonGraphic = decodeGraphic(json.graphic);
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
