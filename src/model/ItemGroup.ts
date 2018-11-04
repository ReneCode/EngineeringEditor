import ItemBase from "./ItemBase";
import ItemFactory from "./ItemFactory";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";

class ItemGroup extends ItemBase {
  items: Array<ItemBase> = [];

  constructor(pageId: string) {
    super(pageId, "group");
  }

  toJSON(): object {
    return (<any>Object).assign({}, this, {
      items: this.items.map(i => {
        return i.toJSON();
      }),
    });
  }

  static fromJSON(json: any): ItemGroup {
    if (json.type !== "group") {
      throw new Error("bad json type:" + json.type);
    }
    const group = Object.create(ItemGroup.prototype);
    return (<any>Object).assign(group, json, {
      items: json.items.map((item: any) => {
        return ItemFactory.fromJSON(item);
      }),
    });
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ) {
    this.items.forEach((item: ItemBase) => {
      item.draw(context, transform);
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    const item = this.items.find((item: ItemBase) =>
      item.nearPoint(pt, radius),
    );
    return item !== null;
  }
}

export default ItemGroup;
