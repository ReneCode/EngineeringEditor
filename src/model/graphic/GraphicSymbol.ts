import Paper from "paper";
import { IdType, PlacementType } from "../types";
import Placement from "../Placement";
import ObjectFactory from "../ObjectFactory";
import PaperUtil from "../../utils/PaperUtil";
import createId from "../createId";
import GraphicText from "./GraphicText";

class GraphicSymbol {
  type: PlacementType = "symbol";
  name: string = "";
  insertPt: Paper.Point = new Paper.Point(0, 0);
  placements: Placement[];
  _item: Paper.Symbol | null = null;

  id: IdType;
  projectId: IdType;

  constructor(placements: Placement[], insertPt: Paper.Point) {
    this.id = createId("S");
    this.placements = placements;
    this.insertPt = insertPt;
  }

  static fromJSON(json: any): GraphicSymbol {
    const symbol = Object.create(GraphicSymbol.prototype);
    let placements: Placement[] = [];
    if (json.placements) {
      placements = ObjectFactory.fromJSON(
        json.placements,
      ) as Placement[];
    }
    return Object.assign(symbol, json, {
      insertPt: PaperUtil.PointFromJSON(json.insertPt),
      placements: placements,
      _item: undefined,
    });
  }

  public toJSON(): any {
    return {
      type: this.type,
      projectId: this.projectId,
      id: this.id,
      name: this.name,
      insertPt: PaperUtil.PointToJSON(this.insertPt),
      placements: ObjectFactory.toJSON(this.placements),
    };
  }

  public getPaperSymbol(): Paper.Symbol {
    if (this._item) {
      return this._item;
    }

    const items: Paper.Item[] = [];
    for (let placement of this.placements) {
      let draw = true;
      if (placement instanceof GraphicText) {
        const propText = placement.getPropId();
        if (propText) {
          draw = false;
        }
      }
      if (draw) {
        items.push(placement.paperDraw());
      }
    }
    const group = new Paper.Group(items);
    // true = dont center the symbol
    const item = new Paper.Symbol(group, true);
    this._item = item;

    return item;
  }

  // create text-item, but take the text out of props
  public getPropTextItemAndPropId(pt: Paper.Point) {
    const items: { item: Paper.PointText; propId: string }[] = [];
    for (let placement of this.placements) {
      if (placement instanceof GraphicText) {
        const propId = placement.getPropId();
        if (propId) {
          // do not use .paperDraw, because it removes the
          // prev-drawn item when
          const item = placement.createPaperItem();
          // const text = props[propText];
          // item.content = text;
          item.position = item.position
            .subtract(this.insertPt)
            .add(pt);
          items.push({ item, propId });
        }
      }
    }
    return items;
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
