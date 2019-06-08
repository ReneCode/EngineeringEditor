import Paper from "paper";
import Point from "../../common/point";
import deepClone from "../../common/deepClone";
import Placement from "../Placement";
import PaperUtil from "../../utils/PaperUtil";

class GraphicPolygon extends Placement {
  points: Paper.Point[] = [];
  constructor() {
    super("polygon");
  }

  static fromJSON(json: any): GraphicPolygon {
    const polygon = Object.create(GraphicPolygon.prototype);
    let points = [];
    if (json.points) {
      points = json.points.map((p: any) =>
        PaperUtil.PointFromJSON(p),
      );
    }
    return (<any>Object).assign(polygon, json, {
      points: points,
    });
  }

  asJSON(): any {
    return {
      ...super.asJSON(),
      points: this.points.map(p => PaperUtil.PointAsJSON(p)),
    };
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


  paperDraw(): Paper.Item {
    const segments = this.points.map(p => {
      return new Paper.Point(p.x, p.y);
    });
    const path = new Paper.Path(segments);
    // this.paperSetStyle(path);
    return path;
  }
  */
}

export default GraphicPolygon;
