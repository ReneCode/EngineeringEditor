import Point from "../../common/point";
import deepClone from "../../common/deepClone";
import Placement from "../Placement";
import Paper from "paper";
import { ItemName } from "../../common/ItemMetaData";

class PaperUtil {
  static PointAsJSON(pt: Paper.Point): any {
    return { x: pt.x, y: pt.y };
  }

  static PointFromJSON(json: any): Paper.Point {
    return new Paper.Point(json.x, json.y);
  }
}

class GraphicArc extends Placement {
  public startAngle: number = 0;
  public endAngle: number = 2 * Math.PI;

  constructor(public center: Paper.Point, public radius: number) {
    super("arc");
  }

  static fromJSON(json: any): GraphicArc {
    const arc = Object.create(GraphicArc.prototype);
    if (!json.center) {
      json.center = { x: 0, y: 0 };
    }
    return (<any>Object).assign(arc, json, {
      center: new Paper.Point(json.center.x, json.center.y),
    });
  }

  asJSON(): any {
    return {
      ...super.asJSON(),
      center: PaperUtil.PointAsJSON(this.center),
      radius: this.radius,
      startAngle: this.startAngle,
      endAngle: this.endAngle,
    };
  }

  toJsonContent(): string {
    return this.asJSON();
  }

  // clone() : GraphicArc {

  // }

  paperDraw(): Paper.Item {
    let item: Paper.Item;
    if (this.startAngle === 0 && this.endAngle === 2 * Math.PI) {
      item = new Paper.Path.Circle(this.center, this.radius);
    } else {
      // start = three o'clock
      const start = this.center.add(new Paper.Point(this.radius, 0));
      const from = start.rotate(this.startAngle);
      const to = start.rotate(this.endAngle);
      const through = start.rotate(
        (this.endAngle + this.startAngle) / 2,
      );
      item = new Paper.Path.Arc(from, through, to);
    }
    item.data = this.id;
    item.name = ItemName.itemArc;
    this.paperSetStyle(item);
    return item;
  }

  translate(pt: Point): GraphicArc {
    const arc = deepClone(this);
    arc.center = arc.center.add(pt);
    return arc;
  }

  /*
  fitToRect(rectangle: Paper.Rectangle): GraphicCircle {
    const circle = deepClone(this);
    circle.pt = new Point(rectangle.center.x, rectangle.center.y);
    circle.radius = rectangle.width / 2;
    return circle;
  }

  updateFromHandles(handles: Paper.Item[]): Placement {
    const circle = deepClone(this);
    const { cx, cy, width, height } = this.getGeometyFromHandles(
      handles,
    );
    circle.pt = new Point(cx, cy);
    circle.radius = height / 2;
    return circle;
  }
  */
}

export default GraphicArc;
