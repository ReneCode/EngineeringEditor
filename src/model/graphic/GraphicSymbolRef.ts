import Paper from "paper";
import GraphicSymbol from "./GraphicSymbol";
import Placement, { DrawMode } from "../Placement";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemMetaData";
import configuration from "../../common/configuration";
import deepClone from "../../common/deepClone";

class GraphicSymbolRef extends Placement {
  private name: string = "";
  private pt: Paper.Point = new Paper.Point(0, 0);
  private _symbol: GraphicSymbol | undefined = undefined;

  constructor(name: string, pt: Paper.Point) {
    super("symbolref");
    this.name = name;
    this.pt = pt;
  }

  static fromJSON(json: any): GraphicSymbolRef {
    const symbolRef = Object.create(GraphicSymbolRef.prototype);
    return Object.assign(symbolRef, json, {
      pt: PaperUtil.PointFromJSON(json.pt),
      name: json.name,
      symbol: undefined,
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      pt: PaperUtil.PointToJSON(this.pt),
      name: this.name,
      symbol: undefined,
    };
  }

  clone(): GraphicSymbolRef {
    const copy = deepClone(this);
    copy._symbol = this._symbol;
    return copy;
  }

  setName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setPoint(pt: Paper.Point) {
    this.pt = pt;
  }

  getPoint(): Paper.Point {
    return this.pt;
  }

  setSymbol(symbol: GraphicSymbol) {
    this._symbol = symbol;
  }

  getSymbol(): GraphicSymbol | undefined {
    return this._symbol;
  }

  paperDraw(): Paper.Item {
    const item = this.createPaperItem();
    if (this._item) {
      this._item.replaceWith(item);
    }
    this._item = item;
    return item;
  }

  setMode(drawMode: DrawMode) {
    this._drawMode = drawMode;
    if (this._tempItems) {
      for (let item of this._tempItems) {
        item.remove();
      }
    }
    this._tempItems = [];

    if (!this._symbol) {
      throw new Error("symbol missing");
    }

    switch (drawMode) {
      case "select":
      case "highlight":
        {
          const bounds = this._symbol.getPaperSymbol().definition
            .bounds;
          const rect = new Paper.Path.Rectangle(bounds);
          rect.strokeColor = configuration.itemHoverStrokeColor;
          rect.position = this.pt;
          this._tempItems.push(rect);
        }
        break;
    }
  }

  dragItem(event: Paper.MouseEvent) {
    if (this._item) {
      // translate
      this.pt = this.pt.add(event.delta);
      this.paperDraw();
      for (let item of this._tempItems) {
        item.position = item.position.add(event.delta);
      }
    }
  }

  createPaperItem() {
    const item = this.createOutline(ItemName.itemSymbolRef);
    item.data = this.id;
    if (this.color) {
      item.strokeColor = this.color;
    }
    return item;
  }

  private createOutline(name: string) {
    if (!this._symbol) {
      throw new Error("symbol missing");
    }

    const symbolItem = this._symbol.getPaperSymbol();
    const item: Paper.PlacedSymbol = symbolItem.place(this.pt);
    item.name = name;
    item.fillColor = "green";
    return item;
  }
}

export default GraphicSymbolRef;
