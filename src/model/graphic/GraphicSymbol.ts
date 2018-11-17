import GraphicBase from "./GraphicBase";
import Point from "../../common/point";
import GraphicFactory from "./GraphicFactory";
import TransformCoordinate from "../../common/transformCoordinate";
import { IdType } from "../types";
import { encodeJson, decodeJson, DtoElement } from "../dtoUtil";

class GraphicSymbol extends GraphicBase {
  projecId: IdType;
  name: string = "name";
  insertPt: Point = new Point();
  items: GraphicBase[] = [];
  id: IdType = "";

  constructor(projectId: IdType, name: string) {
    super("symbol");
    this.projecId = projectId;
    this.name = name;
  }

  toDTO(): DtoElement {
    const content = {
      items: this.items.map((i: GraphicBase) => {
        return i.toJSON();
      }),
      insertPt: this.insertPt.toJSON(),
    };
    return {
      projectId: this.projecId,
      type: this.type,
      name: this.name,
      content: encodeJson(content),
      id: this.id,
    };
  }

  static fromDTO(dto: DtoElement): GraphicSymbol {
    if (dto.type !== "symbol") {
      throw Error("wrong dto-type:" + dto.type);
    }
    const symbol = new GraphicSymbol(dto.projectId, dto.name);
    symbol.id = dto.id;
    const content = decodeJson(dto.content);
    symbol.items = <GraphicBase[]>(
      GraphicFactory.fromJSON(content.items)
    );
    symbol.insertPt = Point.fromJSON(content.insertPt);
    return symbol;
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    this.items.forEach((item: GraphicBase) => {
      item.draw(context, transform);
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    return this.items.some((item: GraphicBase) =>
      item.nearPoint(pt, radius),
    );
  }
}

export default GraphicSymbol;
