import Paper from "paper";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import GraphicSymbol from "./GraphicSymbol";
import Box from "../../common/box";
import Placement, { DrawOptions } from "../Placement";

class GraphicSymbolRef extends Placement {
  name: string = "";
  symbol: GraphicSymbol | undefined = undefined;
  pt: Point = new Point();

  constructor(
    name: string,
    pt: Point = new Point(),
    symbol: GraphicSymbol | undefined = undefined,
  ) {
    super("symbolref");
    this.name = name;
    this.pt = pt;
    this.symbol = symbol;
  }

  paperDraw() {
    return new Paper.Item();
  }

  static fromJSON(json: any): GraphicSymbolRef {
    const group = Object.create(GraphicSymbolRef.prototype);
    return (<any>Object).assign(group, json, {
      pt: Point.fromJSON(json.pt),
      name: json.name,
    });
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
    options: DrawOptions = {},
  ) {
    if (!this.symbol) {
      // throw new Error("symbol not set / " + this.symbolName);
      console.log(`symbol not found: ${this.name}`);
      return;
    }
    const symbol = <GraphicSymbol>this.symbol;
    transform.save();
    transform.addTranslateWc(this.pt);
    symbol.draw(context, transform, {
      ...options,
      parent: this,
    });
    transform.restore();
  }

  nearPoint(pt: Point, radius: number): boolean {
    if (!this.symbol) {
      //      throw new Error("symbol not set / " + this.symbolName);
      console.log(`symbol not found: ${this.name}`);
      return false;
    }
    // on draw() we use addTranslateWc(this.pt) -
    // so we have to sub this.pt for picking
    return this.symbol.nearPoint(pt.sub(this.pt), radius);
  }

  insideBox(box: Box): boolean {
    return box.isPointInside(this.pt);
  }

  translate(pt: Point): Placement {
    // do not use deepClone - because symbol has not to be cloned
    const symbolRef = Object.create(GraphicSymbolRef.prototype);
    return (<any>Object).assign(symbolRef, this, {
      pt: this.pt.add(pt),
    });
  }

  getBoundingBox(): Box {
    if (!this.symbol) {
      throw Error("symbol not found");
    }
    let box = this.symbol.getBoundingBox();
    return box.add(this.pt);
  }
}

export default GraphicSymbolRef;
