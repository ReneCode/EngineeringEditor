import ItemBase from "./ItemBase";
import ItemFactory from "./ItemFactory";

class ItemList extends ItemBase {
  items: Array<ItemBase> = [];

  constructor(pageId: string) {
    super(pageId, "list");
  }

  // http://choly.ca/post/typescript-json/
  toJSON(): object {
    return (<any>Object).assign({}, this, {
      items: this.items.map(i => {
        return i.toJSON();
      }),
    });
  }

  static fromJSON(json: any): ItemList {
    if (json.type !== "list") {
      throw new Error("bad json type:" + json.type);
    }
    const line = Object.create(ItemList.prototype);
    return (<any>Object).assign(line, json, {
      items: json.items.map((item: any) => {
        return ItemFactory.fromJson(item);
      }),
    });
  }
}

export default ItemList;
