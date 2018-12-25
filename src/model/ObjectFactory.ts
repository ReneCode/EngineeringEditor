import { DtoPlacement, decodeJson } from "./dtoUtil";
import Placement from "./Placement";
import GraphicLine from "./graphic/GraphicLine";
import GraphicPolygon from "./graphic/GraphicPolygon";
import GraphicCircle from "./graphic/GraphicCircle";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";
import GraphicSymbol from "./graphic/GraphicSymbol";

class ObjectFactory {
  static fromJSON(json: any): object | object[] {
    if (Array.isArray(json)) {
      return json.map((obj: any) => {
        return obj.fromJSON(obj);
      });
    }

    switch (json.type) {
      case "line":
        return GraphicLine.fromJSON(json);
      case "polygon":
        return GraphicPolygon.fromJSON(json);
      case "circle":
        return GraphicCircle.fromJSON(json);
      case "symbolref":
        return GraphicSymbolRef.fromJSON(json);
      case "symbol":
        return GraphicSymbol.fromJSON(json);
      default:
        throw new Error("bad json type:" + json.type);
    }
  }
}

export default ObjectFactory;
