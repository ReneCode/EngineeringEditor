import ItemBase from "./ItemBase";
import ItemLine from "./ItemLine";
import ItemCircle from "./ItemCircle";
import ItemGroup from "./ItemGroup";
import ItemSymbol from "./ItemSymbol";
import ItemSymbolRef from "./ItemSymbolRef";

class ItemFactory {
  static fromJSON(json: any): ItemBase | Array<ItemBase> {
    if (Array.isArray(json)) {
      return json.map((item: any) => {
        return <ItemBase>ItemFactory.fromJSON(item);
      });
    }
    switch (json.type) {
      case "line":
        return ItemLine.fromJSON(json);
      case "circle":
        return ItemCircle.fromJSON(json);
      case "group":
        return ItemGroup.fromJSON(json);
      case "symbol":
        return ItemSymbol.fromJSON(json);
      case "symbolref":
        return ItemSymbolRef.fromJSON(json);
      default:
        // console.log("bad item type:", json.type);
        throw new Error("bad item type:" + json.type);
    }
  }
}

export default ItemFactory;
