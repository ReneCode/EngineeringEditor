import Paper from "paper";
import { IdType, GraphicType } from "../types";
import Placement from "../Placement";
import ObjectFactory from "../ObjectFactory";
import PaperUtil from "../../utils/PaperUtil";
import createId from "../createId";

class GraphicSymbol {
  type: GraphicType = "symbol";
  name: string = "";
  insertPt: Paper.Point = new Paper.Point(0, 0);
  placements: Placement[];
  _item: Paper.Symbol | null = null;

  id: IdType;
  projectId: IdType;

  constructor(placements: Placement[]) {
    this.id = createId("S");
    this.placements = placements;
  }

  static fromJSON(json: any): GraphicSymbol {
    const symbol = Object.create(GraphicSymbol.prototype);
    let placements: Placement[] = [];
    if (json.placements) {
      placements = ObjectFactory.fromJSON(
        json.placements,
      ) as Placement[];
    }
    return (<any>Object).assign(symbol, json, {
      insertPt: PaperUtil.PointFromJSON(json.insertPt),
      placements: placements,
      _item: undefined,
    });
  }

  toJSON(): any {
    return {
      type: this.type,
      projectId: this.projectId,
      id: this.id,
      name: this.name,
      insertPt: PaperUtil.PointToJSON(this.insertPt),
      placements: ObjectFactory.toJSON(this.placements),
    };
  }

  getPaperSymbol(): Paper.Symbol {
    if (this._item) {
      return this._item;
    }

    const items = this.placements.map(p => p.paperDraw());
    const group = new Paper.Group(items);
    const item = new Paper.Symbol(group);
    this._item = item;

    return item;
  }

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
