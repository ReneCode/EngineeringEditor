import deepClone from "../../common/deepClone";
import Placement from "../Placement";
import Paper from "paper";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemMetaData";

class GraphicLine extends Placement {
  constructor(public p1: Paper.Point, public p2: Paper.Point) {
    super("line");
  }

  static fromJSON(json: any): GraphicLine {
    const line = Object.create(GraphicLine.prototype);
    return (<any>Object).assign(line, json, {
      p1: PaperUtil.PointFromJSON(json.p1),
      p2: PaperUtil.PointFromJSON(json.p2),
    });
  }

  asJSON(): any {
    return {
      ...super.asJSON(),
      p1: PaperUtil.PointAsJSON(this.p1),
      p2: PaperUtil.PointAsJSON(this.p2),
    };
  }

  setSelected(on: boolean) {
    if (on) {
      this._grips = [
        PaperUtil.createGrip(this.p1, 1),
        PaperUtil.createGrip(this.p2, 2),
      ];
    } else {
      this._grips.forEach(g => g.remove());
    }
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {
    gripItem.position = event.point;
    if (this._item) {
      console.log("dragGrip Line:", this._item.id);
    }
    if (this._item) {
      switch (gripItem.data) {
        case 1:
          this.p1 = event.point;
          break;
        case 2:
          this.p2 = event.point;
          break;
        default:
          throw new Error(`bad index: ${gripItem.data}`);
      }
      this.paperDraw();
    }
  }

  dragItem(event: Paper.MouseEvent) {
    if (this._item) {
      this.p1 = this.p1.add(event.delta);
      this.p2 = this.p2.add(event.delta);
      this.paperDraw();
    }
  }

  paperDraw(): Paper.Item {
    const item = new Paper.Path.Line(
      new Paper.Point(this.p1.x, this.p1.y),
      new Paper.Point(this.p2.x, this.p2.y),
    );
    item.data = this.id;
    item.name = ItemName.itemLine;
    this.paperSetStyle(item);

    if (this._item) {
      const ok = this._item.replaceWith(item);
    }
    this._item = item;
    return item;
  }

  translate(pt: Paper.Point) {
    const line: GraphicLine = deepClone(this);
    line.p1 = line.p1.add(pt);
    line.p2 = line.p2.add(pt);
    return line;
  }
}

export default GraphicLine;
