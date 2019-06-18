import Paper from "paper";
import Placement, { DrawMode } from "../Placement";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemName";

class GraphicPolygon extends Placement {
  points: Paper.Point[] = [];
  constructor() {
    super("polygon");
  }

  static fromJSON(json: any): GraphicPolygon {
    const polygon = Object.create(GraphicPolygon.prototype);
    if (!json.points) {
      json.points = [];
    }
    return Object.assign(polygon, json, {
      points: json.points.map((j: any) => PaperUtil.PointFromJSON(j)),
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      points: this.points.map(p => PaperUtil.PointToJSON(p)),
    };
  }

  public paperDraw(drawMode: DrawMode = null): Paper.Item {
    switch (drawMode) {
      case null:
      case undefined:
        this.removeTempItems();
        this.setPaperItem(this.createPaperItem());
        break;
    }
    return this.getPaperItem();
  }

  translate(delta: Paper.Point) {
    this.points = this.points.map(p => p.add(delta));
  }

  private createPaperItem(): Paper.Item {
    const item = new Paper.Path();
    item.addSegments(this.points);
    item.data = this.id;
    item.name = ItemName.itemPolygon;

    if (this.color) {
      item.strokeColor = this.color;
    }
    return item;
  }

  /*
  fitToRect(rectangle: Paper.Rectangle): GraphicPolygon {
    const polygon: GraphicPolygon = deepClone(this);

    const bbox = this.getBoundingBox();
    const scaleX = rectangle.width / bbox.width();
    const scaleY = rectangle.height / bbox.height();
    const centerOrginal = bbox.center();
    const translate = new Paper.Point(
      rectangle.center.x - centerOrginal.x,
      rectangle.center.y - centerOrginal.y,
    );
    let matrix = new Paper.Matrix(1, 0, 0, 1, 0, 0);
    matrix = matrix.scale(
      scaleX,
      scaleY,
      new Paper.Point(rectangle.center),
    );
    matrix = matrix.translate(translate);
    polygon.points = polygon.points.map(p => {
      const pt = matrix.transform(new Paper.Point(p.x, p.y));
      return new Paper.Point(pt.x, pt.y);
    });
    return polygon;
  }

  */
}

export default GraphicPolygon;
