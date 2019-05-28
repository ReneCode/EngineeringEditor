import Placement, { DrawMode } from "../Placement";
import Paper from "paper";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemMetaData";
import configuration from "../../common/configuration";

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

  setMode(drawMode: DrawMode) {
    if (drawMode === this._drawMode) {
      return;
    }
    this._drawMode = drawMode;
    console.log("setMode:", drawMode);

    this.drawTempItems();
  }

  paperDraw(): Paper.Item {
    const item = this.createPaperItem();
    item.data = this.id;
    item.name = ItemName.itemLine;
    this.paperSetStyle(item);

    if (this._item) {
      this._item.replaceWith(item);
    }
    this._item = item;
    return item;
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {
    if (this._drawMode !== "edit") {
      throw new Error("dragGrip only in edit mode");
    }
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
      this.drawTempItems(gripItem.data);
    }
  }

  dragItem(event: Paper.MouseEvent) {
    if (this._item) {
      this.p1 = this.p1.add(event.delta);
      this.p2 = this.p2.add(event.delta);
      this.paperDraw();
      for (let item of this._modeItems) {
        item.position = item.position.add(event.delta);
      }
    }
  }

  private drawTempItems(selectedGripId: number = 0) {
    if (this._modeItems) {
      for (let item of this._modeItems) {
        item.remove();
      }
    }
    this._modeItems = [];
    switch (this._drawMode) {
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
          const grips = this.createGrips(selectedGripId);
          for (let grip of grips) {
            this._modeItems.push(grip);
          }
        }
        break;
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

  private createPaperItem() {
    return new Paper.Path.Line(
      new Paper.Point(this.p1.x, this.p1.y),
      new Paper.Point(this.p2.x, this.p2.y),
    );
  }
}

export default GraphicLine;
