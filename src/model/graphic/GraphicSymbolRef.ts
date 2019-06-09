import Paper, { Point } from "paper";
import GraphicSymbol from "./GraphicSymbol";
import Placement from "../Placement";
import PaperUtil from "../../utils/PaperUtil";

class GraphicSymbolRef extends Placement {
  private name: string = "";
  private _symbol: GraphicSymbol | undefined = undefined;
  private pt: Paper.Point = new Paper.Point(0, 0);

  constructor(name: string, pt: Paper.Point) {
    super("symbolref");
    this.name = name;
    this.pt = pt;
  }

  static fromJSON(json: any): GraphicSymbolRef {
    const symbolRef = Object.create(GraphicSymbolRef.prototype);
    return (<any>Object).assign(symbolRef, json, {
      pt: PaperUtil.PointFromJSON(json.pt),
      name: json.name,
      _symbol: undefined,
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      pt: PaperUtil.PointToJSON(this.pt),
      name: this.name,
      _symbol: undefined,
    };
  }

  setName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
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

  paperDraw() {
    if (!this._symbol) {
      throw new Error("symbol missing");
    }

    const symbolItem = this._symbol.getPaperSymbol();
    const item = symbolItem.place(this.pt);
    return item;
  }
}

export default GraphicSymbolRef;
