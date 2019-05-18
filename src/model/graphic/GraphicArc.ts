import Point from "../../common/point";
import deepClone from "../../common/deepClone";
import Placement from "../Placement";
import Paper from "paper";
import { ItemName } from "../../common/ItemMetaData";
import PaperUtil from "../../utils/PaperUtil";
import Grip from "./Grip";

class GraphicArc extends Placement {
  public startAngle: number = 0;
  public endAngle: number = 0;

  private fullCircle = true;

  constructor(public center: Paper.Point, public radius: number) {
    super("arc");
  }

  static fromJSON(json: any): GraphicArc {
    const arc = Object.create(GraphicArc.prototype);
    if (!json.center) {
      json.center = { x: 0, y: 0 };
    }
    return (<any>Object).assign(arc, json, {
      center: PaperUtil.PointFromJSON(json.center),
    });
  }

  asJSON(): any {
    return {
      ...super.asJSON(),
      center: PaperUtil.PointAsJSON(this.center),
      radius: this.radius,
      startAngle: this.startAngle,
      endAngle: this.endAngle,
      fullCircle: this.fullCircle,
    };
  }

  paperDraw(): Paper.Item {
    let item: Paper.Item;
    // if (this.startAngle === 0 && this.endAngle === 2 * Math.PI) {
    if (this.fullCircle) {
      item = new Paper.Path.Circle(this.center, this.radius);
    } else {
      // start = three o'clock
      const startAngle = this.startAngle;
      const endAngle = this.endAngle;

      const start = this.center.add(new Paper.Point(this.radius, 0));
      const from = start.rotate(startAngle, this.center);
      const to = start.rotate(endAngle, this.center);
      let deltaAngle = 0;
      if (startAngle > endAngle) {
        deltaAngle = 180;
      }
      const through = start.rotate(
        startAngle + deltaAngle + (endAngle - startAngle) / 2,
        this.center,
      );
      item = new Paper.Path.Arc(from, through, to);
    }
    item.data = this.id;
    item.name = ItemName.itemArc;
    this.paperSetStyle(item);

    if (this._item) {
      const ok = this._item.replaceWith(item);
    }
    this._item = item;
    return item;
  }

  setSelected(on: boolean) {
    if (on) {
      const ptStart = this.center
        .add(new Paper.Point(this.radius, 0))
        .rotate(this.startAngle, this.center);
      const gripStart = new Grip(ptStart, 1);

      const ptEnd = this.center
        .add(new Paper.Point(this.radius, 0))
        .rotate(this.endAngle, this.center);
      const gripEnd = new Grip(ptEnd, 2);

      this._grips = [gripStart, gripEnd];
    } else {
      this._grips.forEach(g => g.remove());
    }
  }

  removeGrips() {
    this._grips.forEach(g => g.remove());
    this._grips = [];
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {
    gripItem.position = event.point;
    if (this._item) {
      console.log("dragGrip Arc:", this._item.id);
    }

    if (this._item) {
      const angle = event.point.subtract(this.center).angle;
      const ptOnArc = this.center
        .add(new Paper.Point(this.radius, 0))
        .rotate(angle, this.center);
      gripItem.position = ptOnArc;
      switch (gripItem.data) {
        case 1:
          this.startAngle = angle;
          break;
        case 2:
          this.endAngle = angle;
          break;
        default:
          throw new Error(`bad index: ${gripItem.data}`);
      }

      this.fullCircle = false;
      this.paperDraw();
    }
  }

  translate(pt: Paper.Point): GraphicArc {
    const arc: GraphicArc = deepClone(this);
    arc.center = arc.center.add(pt);
    return arc;
  }

  fitToRect(rectangle: Paper.Rectangle): GraphicArc {
    const arc = deepClone(this) as GraphicArc;
    arc.center = new Paper.Point(
      rectangle.center.x,
      rectangle.center.y,
    );
    arc.radius = rectangle.width / 2;
    return arc;
  }
  /*
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
