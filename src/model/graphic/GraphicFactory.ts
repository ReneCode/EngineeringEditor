import GraphicBase from "./GraphicBase";
import GraphicLine from "./GraphicLine";

class GraphicFactory {
  static fromJSON(json: any): GraphicBase | Array<GraphicBase> {
    if (Array.isArray(json)) {
      return json.map((item: any) => {
        return <GraphicBase>GraphicFactory.fromJSON(item);
      });
    }
    switch (json.type) {
      case "line":
        return GraphicLine.fromJSON(json);
      // case "circle":
      //   return ItemCircle.fromJSON(json);
      // case "group":
      //   return ItemGroup.fromJSON(json);
      // case "symbol":
      //   return ItemSymbol.fromJSON(json);
      // case "symbolref":
      //   return ItemSymbolRef.fromJSON(json);
      default:
        // console.log("bad item type:", json.type);
        throw new Error("bad item type:" + json.type);
    }
  }
}

export default GraphicFactory;
