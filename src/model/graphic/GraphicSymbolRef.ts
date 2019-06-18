import Paper from "paper";
import GraphicSymbol from "./GraphicSymbol";
import Placement, { DrawMode } from "../Placement";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemName";
import configuration from "../../common/configuration";
import deepClone from "../../common/deepClone";

class GraphicSymbolRef extends Placement {
  public name: string = "";
  public pt: Paper.Point = new Paper.Point(0, 0);
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

  /*
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
  */

  setSymbol(symbol: GraphicSymbol) {
    this._symbol = symbol;
  }

  getSymbol(): GraphicSymbol | undefined {
    return this._symbol;
  }

  paperDraw(drawMode: DrawMode = null): Paper.Item {
    switch (drawMode) {
      case null:
        this.removeTempItems();
        this.setPaperItem(this.createPaperItem());
        break;

      case "select":
      case "highlight":
        if (this._symbol) {
          this.removeTempItems();
          const bounds = this._symbol.getPaperSymbol().definition
            .bounds;
          const rect = new Paper.Path.Rectangle(bounds);
          rect.strokeColor = configuration.itemHoverStrokeColor;
          rect.position = this.pt;
          this.addTempItem(rect);
        }
        break;
    }
    return this.getPaperItem();
  }

  translate(delta: Paper.Point) {
    this.pt = this.pt.add(delta);
  }

  createPaperItem() {
    if (!this._symbol) {
      throw new Error("symbol missing");
    }

    const symbolItem = this._symbol.getPaperSymbol();
    const item: Paper.PlacedSymbol = symbolItem.place(this.pt);
    item.name = ItemName.itemSymbolRef;
    item.fillColor = "green";
    item.data = this.id;
    if (this.color) {
      item.strokeColor = this.color;
    }
    return item;
  }
}

export default GraphicSymbolRef;
