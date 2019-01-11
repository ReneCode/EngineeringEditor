import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import { IdType, GraphicType } from "../types";
import Placement from "../Placement";
import ObjectFactory from "../ObjectFactory";
import Box from "../../common/box";

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
      items: json.items.map((i: Placement) =>
        ObjectFactory.fromJSON(i),
      ),
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

  getBoundingBox(): Box {
    if (this.items.length === 0) {
      return new Box(new Point(), new Point());
    }
    let box = this.items[0].getBoundingBox();
    this.items.forEach(item => {
      box = box.expandByBox(item.getBoundingBox());
    });
    return box.sub(this.insertPt);
  }
}

export default GraphicSymbol;
