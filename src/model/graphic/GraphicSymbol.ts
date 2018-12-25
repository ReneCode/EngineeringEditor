import GraphicBase from "./GraphicBase";
import Point from "../../common/point";
import GraphicFactory from "./GraphicFactory";
import TransformCoordinate from "../../common/transformCoordinate";
import { IdType, GraphicType } from "../types";
import { encodeJson, decodeJson, DtoElement } from "../dtoUtil";
import Placement from "../Placement";
import PlacementFactory from "../PlacementFactory";

class GraphicSymbol {
  projectId: IdType;
  name: string;
  insertPt: Point = new Point();
  items: Placement[] = [];
  id: IdType = "";
  type: GraphicType = "symbol";

  constructor(projectId: IdType, name: string) {
    this.projectId = projectId;
    this.name = name;
  }

  toJSON(): object {
    const result = {
      items: this.items.map((i: Placement) => {
        return i.toJSON();
      }),
      insertPt: this.insertPt.toJSON(),
    };
    return result;
  }

  static fromJSON(json: any): GraphicSymbol {
    const symbol = Object.create(GraphicSymbol.prototype);
    return (<any>Object).assign(symbol, {
      insertPt: Point.fromJSON(json.insertPt),
      items: PlacementFactory.fromJSON(json.items),
    });
  }

  toDTO(): DtoElement {
    const content = this.toJSON();
    return {
      projectId: this.projectId,
      type: this.type,
      name: this.name,
      content: encodeJson(content),
      id: this.id,
    };
  }

  static fromDTO(dto: DtoElement): GraphicSymbol {
    const json = decodeJson(dto.content);
    const symbol = GraphicSymbol.fromJSON(json);

    symbol.id = dto.id;
    symbol.type = dto.type;
    symbol.projectId = dto.projectId;
    symbol.name = dto.name;
    return symbol;
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    transform.addTranslateWc(this.insertPt.invert());
    this.items.forEach((item: Placement) => {
      item.draw(context, transform);
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    // on draw() we use addTranslateWc(inverted this.pt) -
    // so we have to add this.pt for picking

    return this.items.some((item: Placement) =>
      item.nearPoint(pt.add(this.insertPt), radius),
    );
  }
}

export default GraphicSymbol;
