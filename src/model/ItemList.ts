import ItemBase from "./ItemBase";
import ItemLine from "./ItemLine";
import ItemCircle from "./ItemCircle";

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
      items: json.items.map((i: any) => {
        switch (i.type) {
          case "line":
            return ItemLine.fromJSON(i);
          case "circle":
            return ItemCircle.fromJSON(i);
          default:
            console.log("bad item type:", i.type);
          // throw new Error("bad item type:" + i.type);
        }
      }),
    });
  }
}

export default ItemList;
