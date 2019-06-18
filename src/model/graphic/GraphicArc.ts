import Placement, { DrawMode } from "../Placement";
import Paper from "paper";
import { ItemName } from "../../common/ItemName";
import PaperUtil from "../../utils/PaperUtil";
import configuration from "../../common/configuration";

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
    return Object.assign(arc, json, {
      center: PaperUtil.PointFromJSON(json.center),
      _item: undefined,
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      center: PaperUtil.PointToJSON(this.center),
      radius: this.radius,
      startAngle: this.startAngle,
      endAngle: this.endAngle,
      fullCircle: this.fullCircle,
    };
  }

  paperDraw(drawMode: DrawMode = null): Paper.Item {
    switch (drawMode) {
      case null:
      case undefined:
        this.removeTempItems();
        this.setPaperItem(this.createPaperItem());
        break;

      case "highlight":
        {
          this.removeTempItems();
          const item = this.createOutline(ItemName.temp);
          item.strokeColor = configuration.modeHighlightColor;
          this.addTempItem(item);
        }
        break;

      case "select":
        this.drawGrips();
        break;

      default:
        throw new Error("bad drawMode:" + drawMode);
    }
    return this.getPaperItem();
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {
    let angle = event.point.subtract(this.center).angle;
    switch (gripItem.data) {
      case 1:
      case 2:
        this.fullCircle = false;
        const ptOnArc = this.center
          .add(new Paper.Point(this.radius, 0))
          .rotate(angle, this.center);
        gripItem.position = ptOnArc;
        if (gripItem.data === 1) {
          this.startAngle = angle;
        } else {
          this.endAngle = angle;
        }
        break;
      case 3:
        const newRadius = event.point.subtract(this.center).length;
        this.radius = newRadius;

        let startAngle = this.startAngle;
        let endAngle = this.endAngle;

        let swap = false;
        if (startAngle < endAngle) {
          if (angle < startAngle || angle > endAngle) {
            swap = true;
          }
        } else {
          if (angle > endAngle && angle < startAngle) {
            swap = true;
          }
        }
        if (swap) {
          const tmp = this.startAngle;
          this.startAngle = this.endAngle;
          this.endAngle = tmp;
        }
        break;

      default:
        throw new Error(`bad index: ${gripItem.data}`);
    }

    this.paperDraw();
    this.drawGrips(gripItem.data);
  }

  translate(delta: Paper.Point) {
    this.center = this.center.add(delta);
  }

  createPaperItem(): Paper.Item {
    const item = this.createOutline(ItemName.itemArc);
    item.data = this.id;

    if (this.fill) {
      item.fillColor = this.fill;
    }
    if (this.color) {
      item.strokeColor = this.color;
    } else {
      item.strokeColor = "grey";
    }
    return item;
  }

  private drawGrips(selectedGripId: number = 0) {
    this.removeTempItems();
    const item = this.createOutline(ItemName.temp);
    item.strokeColor = configuration.modeSelectColor;
    this.addTempItem(item);
    const grips = this.createGrips(selectedGripId);
    for (let grip of grips) {
      this.addTempItem(grip);
    }
  }

  private createOutline(name: string | undefined): Paper.Item {
    let item: Paper.Item;
    if (this.fullCircle) {
      item = new Paper.Path.Circle(this.center, this.radius);
    } else {
      const pts = this.calcPoints();
      item = new Paper.Path.Arc(pts.from, pts.through, pts.to);
    }
    if (name) {
      item.name = name;
    }
    return item;
  }

  private createGrips(selectedGripId: number = 0): Paper.Item[] {
    const pts = this.calcPoints();
    const grips = [
      PaperUtil.createGrip(pts.from, 1),
      PaperUtil.createGrip(pts.to, 2),
      PaperUtil.createGrip(pts.through, 3),
    ];
    const grip = grips.find(g => g.data === selectedGripId);
    if (grip) {
      grip.fillColor = configuration.gripDragFillColor;
    }

    return grips;
  }

  private calcPoints(): {
    from: Paper.Point;
    to: Paper.Point;
    through: Paper.Point;
  } {
    const startAngle = this.startAngle;
    const endAngle = this.endAngle;
    // start = three o'clock
    const start = this.center.add(new Paper.Point(this.radius, 0));
    const from = start.rotate(startAngle, this.center);
    const to = start.rotate(endAngle, this.center);
    let deltaAngle = 0;
    if (startAngle > endAngle) {
      deltaAngle = 180;
    }

    let through: Paper.Point;
    if (this.fullCircle) {
      through = start.rotate(180, this.center);
    } else {
      through = start.rotate(
        startAngle + deltaAngle + (endAngle - startAngle) / 2,
        this.center,
      );
    }
    return { from, to, through };
  }
}

export default GraphicArc;
