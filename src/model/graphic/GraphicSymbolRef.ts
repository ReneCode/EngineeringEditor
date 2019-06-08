import Paper, { Point } from "paper";
import GraphicSymbol from "./GraphicSymbol";
import Placement from "../Placement";
import PaperUtil from "../../utils/PaperUtil";

class GraphicSymbolRef extends Placement {
  name: string = "";
  _symbol: GraphicSymbol | undefined = undefined;
  pt: Paper.Point = new Paper.Point(0, 0);

  constructor(name: string, pt: Paper.Point) {
    super("symbolref");
    this.name = name;
    this.pt = pt;
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

  static fromJSON(json: any): GraphicSymbolRef {
    const group = Object.create(GraphicSymbolRef.prototype);
    return (<any>Object).assign(group, json, {
      pt: PaperUtil.PointFromJSON(json.pt),
      name: json.name,
    });
  }

  // draw(
  //   context: CanvasRenderingContext2D,
  //   transform: TransformCoordinate,
  //   options: DrawOptions = {},
  // ) {
  //   if (!this.symbol) {
  //     // throw new Error("symbol not set / " + this.symbolName);
  //     console.log(`symbol not found: ${this.name}`);
  //     return;
  //   }
  //   const symbol = <GraphicSymbol>this.symbol;
  //   transform.save();
  //   transform.addTranslateWc(this.pt);
  //   symbol.draw(context, transform, {
  //     ...options,
  //     parent: this,
  //   });
  //   transform.restore();
  // }

  // nearPoint(pt: Point, radius: number): boolean {
  //   if (!this.symbol) {
  //     //      throw new Error("symbol not set / " + this.symbolName);
  //     console.log(`symbol not found: ${this.name}`);
  //     return false;
  //   }
  //   // on draw() we use addTranslateWc(this.pt) -
  //   // so we have to sub this.pt for picking
  //   return this.symbol.nearPoint(pt.sub(this.pt), radius);
  // }

  // insideBox(box: Box): boolean {
  //   return box.isPointInside(this.pt);
  // }

  translate(pt: Paper.Point): Placement {
    // do not use deepClone - because symbol has not to be cloned
    const symbolRef = Object.create(GraphicSymbolRef.prototype);
    return (<any>Object).assign(symbolRef, this, {
      pt: this.pt.add(pt),
    });
  }

  // getBoundingBox(): Box {
  //   if (!this.symbol) {
  //     throw Error("symbol not found");
  //   }
  //   let box = this.symbol.getBoundingBox();
  //   return box.add(this.pt);
  // }
}

export default GraphicSymbolRef;
