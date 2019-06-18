import Placement, { DrawMode } from "../Placement";
import Paper from "paper";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemName";
import configuration from "../../common/configuration";

class GraphicLine extends Placement {
  constructor(public p1: Paper.Point, public p2: Paper.Point) {
    super("line");
  }

  static fromJSON(json: any): GraphicLine {
    const line = Object.create(GraphicLine.prototype);
    return Object.assign(line, json, {
      p1: PaperUtil.PointFromJSON(json.p1),
      p2: PaperUtil.PointFromJSON(json.p2),
      _item: undefined,
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      p1: PaperUtil.PointToJSON(this.p1),
      p2: PaperUtil.PointToJSON(this.p2),
    };
  }

  paperDraw(drawMode: DrawMode = null): Paper.Item {
    switch (drawMode) {
      case null:
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
    }
    return this.getPaperItem();
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {
    gripItem.position = event.point;
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
      this.drawGrips(gripItem.data);
    }
  }

  translate(delta: Paper.Point) {
    this.p1 = this.p1.add(delta);
    this.p2 = this.p2.add(delta);
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

  private createGrips(selectedGripId: number = 0): Paper.Item[] {
    const grips = [
      PaperUtil.createGrip(this.p1, 1),
      PaperUtil.createGrip(this.p2, 2),
    ];
    const grip = grips.find(g => g.data === selectedGripId);
    if (grip) {
      grip.fillColor = configuration.gripDragFillColor;
    }
    return grips;
  }

  private createOutline(name: string): Paper.Item {
    const item = new Paper.Path.Line(
      new Paper.Point(this.p1.x, this.p1.y),
      new Paper.Point(this.p2.x, this.p2.y),
    );
    item.name = name;
    return item;
  }

  createPaperItem() {
    const item = this.createOutline(ItemName.itemLine);
    item.data = this.id;

    if (this.color) {
      item.strokeColor = this.color;
    } else {
      item.strokeColor = "grey";
    }
    return item;
  }
}

export default GraphicLine;
