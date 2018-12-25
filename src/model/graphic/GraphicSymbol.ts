import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import { IdType, GraphicType } from "../types";
import Placement from "../Placement";

class GraphicSymbol {
  projectId: IdType;
  name: string;
  insertPt: Point = new Point();
  items: Placement[] = [];
  id: IdType;
  type: GraphicType = "symbol";

  constructor(projectId: IdType, name: string) {
    this.projectId = projectId;
    this.name = name;
  }

  static fromJSON(json: any): GraphicSymbol {
    const line = Object.create(GraphicSymbol.prototype);
    return (<any>Object).assign(line, json, {
      insertPt: Point.fromJSON(json.insertPt),
    });
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
