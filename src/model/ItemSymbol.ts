import ItemBase from "./ItemBase";
import ItemFactory from "./ItemFactory";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import deepClone from "../common/deepClone";

class ItemSymbol extends ItemBase {
  name: string = "name";
  insertPt: Point = new Point();
  items: ItemBase[] = [];

  constructor() {
    super("", "symbol");
  }

  toJSON(): object {
    return (<any>Object).assign({}, super.toJSON(), {
      items: this.items.map((i: ItemBase) => {
        return i.toJSON();
      }),
      name: this.name,
      insertPt: this.insertPt,
    });
  }

  static fromJSON(json: any): ItemSymbol {
    if (json.type !== "symbol") {
      throw new Error("bad json type:" + json.type);
    }
    const group = Object.create(ItemSymbol.prototype);
    return (<any>Object).assign(group, json, {
      items: json.items.map((item: any) => {
        return ItemFactory.fromJSON(item);
      }),
      name: json.name,
      insertPt: Point.fromJSON(json.insertPt),
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

export default ItemSymbol;
