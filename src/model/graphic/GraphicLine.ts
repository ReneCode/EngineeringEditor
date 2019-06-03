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

    this.drawTempItems();
  }

  paperDraw(): Paper.Item {
    const item = this.createPaperItem();

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
      this.translate(event.delta);
      this.paperDraw();
      for (let item of this._tempItems) {
        item.position = item.position.add(event.delta);
      }
    }
  }

  translate(delta: Paper.Point) {
    this.p1 = this.p1.add(delta);
    this.p2 = this.p2.add(delta);
  }

  private drawTempItems(selectedGripId: number = 0) {
    if (this._tempItems) {
      for (let item of this._tempItems) {
        item.remove();
      }
    }
    this._tempItems = [];
    switch (this._drawMode) {
      case "hover":
        {
          const item = this.createOutline(ItemName.temp);
          item.strokeColor = configuration.modeHoverColor;
          item.strokeWidth = 2;
          this._tempItems.push(item);
        }
        break;
      case "select":
        {
          const item = this.createOutline(ItemName.temp);
          item.strokeColor = configuration.modeSelectColor;
          this._tempItems.push(item);
        }
        break;
      case "edit":
        {
          const item = this.createOutline(ItemName.temp);
          item.strokeColor = configuration.modeEditColor;
          this._tempItems.push(item);
          const grips = this.createGrips(selectedGripId);
          for (let grip of grips) {
            this._tempItems.push(grip);
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

    // item.dashArray = [4, 6];
    // item.strokeWidth = 3;
    // item.onFrame = () => {
    //   item.dashOffset = (item.dashOffset + 0.1) % 10;
    // };
    return item;
  }
}

export default GraphicLine;
