import Paper from "paper";
import TransformCoordinate from "../../common/transformCoordinate";
import { IdType, GraphicType } from "../types";
import Placement from "../Placement";
import ObjectFactory from "../ObjectFactory";
import Box from "../../common/box";

class GraphicSymbol {
  projectId: IdType;
  name: string = "";
  insertPt: Paper.Point = new Paper.Point(0, 0);
  items: Placement[] = [];
  id: IdType;
  type: GraphicType = "symbol";
  /*
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
    options: any = null,
  ) {
    transform.addTranslateWc(this.insertPt.invert());
    this.items.forEach((item: Placement) => {
      item.draw(context, transform, options);
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
  */
}

export default GraphicSymbol;
