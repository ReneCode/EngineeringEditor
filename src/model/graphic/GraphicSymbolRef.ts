import Paper, { Point } from "paper";
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
  private props: any = {
    color: "color of symbolRef",
    name: "hello",
  };

  constructor(name: string, pt: Paper.Point = new Paper.Point(0, 0)) {
    super("symbolref");
    this.name = name;
    this.pt = pt.clone();
  }

  static fromJSON(json: any): GraphicSymbolRef {
    const symbolRef = Object.create(GraphicSymbolRef.prototype);
    return Object.assign(symbolRef, json, {
      pt: PaperUtil.PointFromJSON(json.pt),
      name: json.name,
      symbol: undefined,
      props: json.props,
    });
  }

  public toJSON(): any {
    return {
      ...super.toJSON(),
      pt: PaperUtil.PointToJSON(this.pt),
      name: this.name,
      symbol: undefined,
      props: this.props,
    };
  }

  public clone(): GraphicSymbolRef {
    const copy = deepClone(this);
    copy._symbol = this._symbol;
    return copy;
  }

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

      case "highlight":
        {
          this.removeTempItems();
          const bounds = this.getPaperItem().bounds;
          const rect = new Paper.Path.Rectangle(bounds);
          rect.strokeColor = configuration.itemHoverStrokeColor;
          rect.position = this._item.position;
          this.addTempItem(rect);
        }
        break;

      case "select":
        {
          this.removeTempItems();
          const bounds = this.getPaperItem().bounds;
          const rect = new Paper.Path.Rectangle(bounds);
          rect.strokeColor = configuration.itemHoverStrokeColor;
          rect.position = this._item.position;

          this.addTempItem(rect);
        }
        break;
    }
    return this.getPaperItem();
  }

  translate(delta: Paper.Point) {
    this.pt = this.pt.add(delta);
  }

  private createPaperItem() {
    if (!this._symbol) {
      throw new Error("symbol missing");
    }
    const symbolItem = this._symbol.getPaperSymbol();
    let item: Paper.Item = symbolItem.place(
      this.pt.subtract(this._symbol.insertPt),
    );
    item.name = ItemName.itemSymbolRef;
    if (this.props) {
      const propTextItems = this._symbol.drawPropText(
        this.pt,
        this.props,
      );
      if (propTextItems.length > 0) {
        item = new Paper.Group([item, ...propTextItems]);
        item.name = ItemName.itemGroup;
      }
    }

    item.data = this.id;
    if (this.color) {
      item.strokeColor = this.color;
    }
    return item;
  }
}

export default GraphicSymbolRef;
