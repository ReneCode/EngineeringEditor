import ItemBase from "./ItemBase";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import deepClone from "../common/deepClone";
import ItemSymbol from "./ItemSymbol";

class ItemSymbolRef extends ItemBase {
  symbolName: string = "";
  symbol: ItemSymbol | null = null;
  pt: Point = new Point();

  constructor(pageId: string) {
    super(pageId, "symbolref");
  }

  toJSON(): object {
    return (<any>Object).assign({}, super.toJSON(), {
      pt: this.pt.toJSON(),
    });
  }

  static fromJSON(json: any): ItemSymbolRef {
    if (json.type !== "symbolref") {
      throw new Error("bad json type:" + json.type);
    }
    const group = Object.create(ItemSymbolRef.prototype);
    return (<any>Object).assign(group, json, {
      pt: Point.fromJSON(json.pt),
    });
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    if (!this.symbol) {
      throw new Error("symbol not set / " + this.symbolName);
    }
    const symbol: ItemSymbol = <ItemSymbol>this.symbol;
    transform.save();
    transform.addTranslateWc(this.pt);
    symbol.draw(context, transform);
    transform.restore();
  }

  nearPoint(pt: Point, radius: number): boolean {
    if (!this.symbol) {
      throw new Error("symbol not set / " + this.symbolName);
    }
    const symbol: ItemSymbol = <ItemSymbol>this.symbol;
    return symbol.nearPoint(pt.add(this.pt), radius);
  }

  translate(pt: Point): ItemBase {
    // do not use deepClone - because symbol has not to be cloned
    const symbolRef = Object.create(ItemSymbolRef.prototype);
    return (<any>Object).assign(symbolRef, this, {
      pt: this.pt.add(pt),
    });
  }
}

export default ItemSymbolRef;
