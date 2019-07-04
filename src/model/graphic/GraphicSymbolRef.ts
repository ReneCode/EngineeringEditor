import Paper, { Point } from "paper";
import GraphicSymbol from "./GraphicSymbol";
import Placement, { DrawMode } from "../Placement";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemName";
import configuration from "../../common/configuration";
import deepClone from "../../common/deepClone";
import GraphicTextItem from "./GraphicTextItem";
import PlacementUtil from "../../utils/PlacementUtil";

class GraphicSymbolRef extends Placement {
  public name: string = "";
  public pt: Paper.Point = new Paper.Point(0, 0);
  private _symbol: GraphicSymbol | undefined = undefined;
  private props: any = {
    color: "color of symbolRef",
    name: "hello",
  };
  private graphicTextItems: GraphicTextItem[] = [];

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
          this.graphicTextItems.forEach(gti => gti.makeEditable());
        }
        break;
    }
    return this.getPaperItem();
  }

  translate(delta: Paper.Point) {
    this.pt = this.pt.add(delta);
  }

  getPropText(propId: string): string {
    if (this.props) {
      return this.props[propId];
    } else {
      return "";
    }
  }

  setPropText(propId: string, text: string) {
    if (this.props) {
      if (this.props[propId] !== text) {
        this.props[propId] = text;
        PlacementUtil.updatePlacement(this);
      }
    }
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
      const items: Paper.Item[] = [];
      const propTextItemAndPropId = this._symbol.getPropTextItemAndPropId(
        this.pt,
      );
      this.graphicTextItems = [];
      propTextItemAndPropId.forEach(tp => {
        const gti = new GraphicTextItem(tp.item, tp.propId);
        gti.setGetTextFn(this.getPropText.bind(this));
        gti.setSetTextFn(this.setPropText.bind(this));
        gti.draw();

        this.graphicTextItems.push(gti);
        items.push(tp.item);
      });
      // const propTextItems = this._symbol.drawPropText(
      //   this.pt,
      //   this.props,
      // );
      if (propTextItemAndPropId.length > 0) {
        item = new Paper.Group([item, ...items]);
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
