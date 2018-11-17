import GraphicBase from "./GraphicBase";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import { symbol } from "prop-types";
import GraphicSymbol from "./GraphicSymbol";

class GraphicSymbolRef extends GraphicBase {
  name: string = "";
  symbol: GraphicSymbol | null = null;
  pt: Point = new Point();

  constructor(name: string) {
    super("symbolref");
    this.name = name;
  }

  toJSON(): object {
    return (<any>Object).assign({}, this, {
      pt: this.pt.toJSON(),
      symbol: undefined,
    });
  }

  static fromJSON(json: any): GraphicSymbolRef {
    const group = Object.create(GraphicSymbolRef.prototype);
    return (<any>Object).assign(group, json, {
      pt: Point.fromJSON(json.pt),
      symbol: undefined,
    });
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    if (!this.symbol) {
      // throw new Error("symbol not set / " + this.symbolName);
      console.log(`symbol not found: ${this.name}`);
      return;
    }
    const symbol = <GraphicSymbol>this.symbol;
    transform.save();
    transform.addTranslateWc(this.pt);
    symbol.draw(context, transform);
    transform.restore();
  }

  nearPoint(pt: Point, radius: number): boolean {
    if (!this.symbol) {
      //      throw new Error("symbol not set / " + this.symbolName);
      console.log(`symbol not found: ${this.name}`);
      return false;
    }

    return this.symbol.nearPoint(pt.sub(this.pt), radius);
  }

  translate(pt: Point): GraphicBase {
    // do not use deepClone - because symbol has not to be cloned
    const symbolRef = Object.create(GraphicSymbolRef.prototype);
    return (<any>Object).assign(symbolRef, this, {
      pt: this.pt.add(pt),
    });
  }
}

export default GraphicSymbolRef;
