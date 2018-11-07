import ItemBase from "./ItemBase";
import ItemFactory from "./ItemFactory";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import deepClone from "../common/deepClone";

class ItemSymbolRef extends ItemBase {
  symbolName: string = "";
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
  /*
  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    this.items.forEach((item: ItemBase) => {
      item.draw(context, transform);
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    return this.items.some((item: ItemBase) =>
      item.nearPoint(pt, radius),
    );
  }

  translate(pt: Point): ItemBase {
    const group = deepClone(this);
    group.items = group.items.map((item: ItemBase) =>
      item.translate(pt),
    );
    return group;
  }
  */
}

export default ItemSymbolRef;
