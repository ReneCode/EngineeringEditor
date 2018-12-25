import ItemBase from "./ItemBase";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import deepClone from "../common/deepClone";
import ItemSymbol from "./ItemSymbol";

class ItemSymbolRef extends ItemBase {
  // symbolName: string = "";
  // symbol: ItemSymbol | null = null;
  // pt: Point = new Point();
  // constructor(pageId: string) {
  //   super(pageId, "symbolref");
  // }
  // toJSON(): object {
  //   return (<any>Object).assign({}, this, {
  //     pt: this.pt.toJSON(),
  //     symbol: undefined,
  //   });
  // }
  // static fromJSON(json: any): ItemSymbolRef {
  //   if (json.type !== "symbolref") {
  //     throw new Error("bad json type:" + json.type);
  //   }
  //   const group = Object.create(ItemSymbolRef.prototype);
  //   return (<any>Object).assign(group, json, {
  //     pt: Point.fromJSON(json.pt),
  //     symbol: undefined,
  //   });
  // }
  // draw(
  //   context: CanvasRenderingContext2D,
  //   transform: TransformCoordinate,
  // ) {
  //   if (!this.symbol) {
  //     // throw new Error("symbol not set / " + this.symbolName);
  //     console.log(`symbol not found: ${this.symbolName}`);
  //     return;
  //   }
  //   const symbol: ItemSymbol = <ItemSymbol>this.symbol;
  //   transform.save();
  //   transform.addTranslateWc(this.pt);
  //   symbol.draw(context, transform);
  //   transform.restore();
  // }
  // nearPoint(pt: Point, radius: number): boolean {
  //   if (!this.symbol) {
  //     //      throw new Error("symbol not set / " + this.symbolName);
  //     console.log(`symbol not found: ${this.symbolName}`);
  //     return false;
  //   }
  //   return this.symbol.nearPoint(pt.sub(this.pt), radius);
  // }
  // translate(pt: Point): ItemBase {
  //   // do not use deepClone - because symbol has not to be cloned
  //   const symbolRef = Object.create(ItemSymbolRef.prototype);
  //   return (<any>Object).assign(symbolRef, this, {
  //     pt: this.pt.add(pt),
  //   });
  // }
}

export default ItemSymbolRef;
