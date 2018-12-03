import GraphicBase from "./GraphicBase";
import GraphicLine from "./GraphicLine";
import GraphicCircle from "./GraphicCircle";
import GraphicSymbolRef from "./GraphicSymbolRef";
import GraphicPolygon from "./GraphicPolygon";
import GraphicConnectionPoint from "./GraphicConnectionPoint";

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
      case "polygon":
        return GraphicPolygon.fromJSON(json);
      case "connectionpoint":
        return GraphicConnectionPoint.fromJSON(json);
      case "circle":
        return GraphicCircle.fromJSON(json);
      // case "group":
      //   return ItemGroup.fromJSON(json);
      // case "symbol":
      //   return GraphicSymbol.fromJSON(json);
      case "symbolref":
        return GraphicSymbolRef.fromJSON(json);
      default:
        // console.log("bad item type:", json.type);
        throw new Error("bad item type:" + json.type);
    }
  }
}

export default GraphicFactory;
