import GraphicLine from "./graphic/GraphicLine";
import GraphicPolygon from "./graphic/GraphicPolygon";
import GraphicCircle from "./graphic/GraphicCircle";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";
import GraphicSymbol from "./graphic/GraphicSymbol";
import GraphicConnectionPoint from "./graphic/GraphicConnectionPoint";
import GraphicText from "./graphic/GraphicText";

class ObjectFactory {
  static fromJSON(json: any): object | object[] {
    if (Array.isArray(json)) {
      return json.map((obj: any) => ObjectFactory.fromJSON(obj));
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
      case "connectionpoint":
        return GraphicConnectionPoint.fromJSON(json);
      case "text":
        return GraphicText.fromJSON(json);
      default:
        throw new Error("bad json type:" + json.type);
    }
  }

  static toJSON(obj: any | object[]): any {
    if (Array.isArray(obj)) {
      return obj.map((o: any) => ObjectFactory.fromJSON(o));
    }

    if (obj.toJSON && typeof obj.toJSON === "function") {
      return obj.toJSON();
    } else {
      throw new Error("toJSON missing on object:" + obj);
    }
  }
}

export default ObjectFactory;
