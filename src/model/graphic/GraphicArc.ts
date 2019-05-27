import Point from "../../common/point";
import deepClone from "../../common/deepClone";
import Placement, { DrawMode } from "../Placement";
import Paper from "paper";
import { ItemName } from "../../common/ItemMetaData";
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

  setMode(drawMode: DrawMode) {
    if (drawMode === this._drawMode) {
      return;
    }
    console.log("setMode:", drawMode);

    this._drawMode = drawMode;
    if (this._modeItems) {
      for (let item of this._modeItems) {
        item.remove();
      }
    }
    this._modeItems = [];
    switch (drawMode) {
      case "hover":
        {
          const item = this.createPaperItem();
          item.strokeColor = configuration.selectionColor;
          item.strokeWidth = 2;
          this._modeItems.push(item);
        }
        break;
      case "select":
        {
          const item = this.createPaperItem();
          item.strokeColor = configuration.selectionColor;
          this._modeItems.push(item);
        }
        break;
      case "edit":
        {
          const item = this.createPaperItem();
          item.strokeColor = configuration.selectionColor;
          this._modeItems.push(item);
          const grips = this.createGrips();
          for (let grip of grips) {
            this._modeItems.push(grip);
          }
        }
        break;
    }
  }

  paperDraw(): Paper.Item {
    let item: Paper.Item = this.createPaperItem();
    item.data = this.id;
    item.name = ItemName.itemArc;
    this.paperSetStyle(item);

    if (this._item) {
      this._item.replaceWith(item);
    }
    this._item = item;

    return item;
  }

  private createPaperItem(): Paper.Item {
    let item: Paper.Item;
    if (this.fullCircle) {
      item = new Paper.Path.Circle(this.center, this.radius);
    } else {
      const pts = this.calcPoints();
      item = new Paper.Path.Arc(pts.from, pts.through, pts.to);
    }
    return item;
  }

  setSelected(on: boolean) {
    // if (on) {
    //   this.drawGrips();
    // } else {
    //   this.removeGrips();
    // }
  }

  private drawGrips(selectedGripId: number = 0) {
    this.removeGrips();
    this._grips = this.createGrips();
    if (selectedGripId > 0) {
      const selectGrip = this._grips.find(
        g => g.data === selectedGripId,
      );
      if (selectGrip) {
        selectGrip.fillColor = configuration.gripDragFillColor;
      }
    }
  }

  private createGrips(): Paper.Item[] {
    const pts = this.calcPoints();
    const grips = [
      PaperUtil.createGrip(pts.from, 1),
      PaperUtil.createGrip(pts.to, 2),
      PaperUtil.createGrip(pts.through, 3),
    ];
    return grips;
  }

  removeGrips() {
    if (this._grips) {
      this._grips.forEach(g => g.remove());
    }
    this._grips = [];
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {
    if (this._item) {
      let angle = event.point.subtract(this.center).angle;
      switch (gripItem.data) {
        case 1:
        case 2:
          this.fullCircle = false;
          const ptOnArc = this.center
            .add(new Paper.Point(this.radius, 0))
            .rotate(angle, this.center);
          gripItem.position = ptOnArc;
          if (gripItem.data == 1) {
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

      if (gripItem.data === 3) {
        const editGripItem = this._grips.find(
          g => g.data === gripItem.data,
        );
        if (editGripItem) {
          editGripItem.position = event.point;
        }
      }
    }
  }

  dragItem(event: Paper.MouseEvent) {
    if (this._item) {
      this.center = this.center.add(event.delta);
      this.paperDraw();
      for (let item of this._modeItems) {
        item.position = item.position.add(event.delta);
      }
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
