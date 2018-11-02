import ItemBase from "./ItemBase";
import ItemLine from "./ItemLine";
import ItemCircle from "./ItemCircle";

type ItemTypes = "list" | "line" | "circle" | "rect";

class ItemFactory {
  static fromJson(json: any): ItemBase {
    switch (json.type) {
      case "line":
        return ItemLine.fromJSON(json);
      case "circle":
        return ItemCircle.fromJSON(json);
      default:
        // console.log("bad item type:", json.type);
        throw new Error("bad item type:" + json.type);
    }
  }
}

export default ItemFactory;
