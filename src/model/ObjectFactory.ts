import GraphicLine from "./graphic/GraphicLine";
import GraphicPolygon from "./graphic/GraphicPolygon";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";
import GraphicSymbol from "./graphic/GraphicSymbol";
import GraphicText from "./graphic/GraphicText";
import GraphicRect from "./graphic/GraphicRect";
import GraphicArc from "./graphic/GraphicArc";
import GraphicGroup from "./graphic/GraphicGroup";
import GraphicConnectionPoint from "./graphic/GraphicConnectionPoint";

class ObjectFactory {
  static fromJSON(json: any): object | object[] | null {
    if (Array.isArray(json)) {
      const objects = [];
      for (let o of json) {
        if (o.type) {
          objects.push(ObjectFactory.fromJSON(o));
        } else {
          console.warn("bad json:", json);
        }
      }
      if (objects.length > 0) {
        return objects;
      }
      return null;
    }

    switch (json.type) {
      case "group":
        return GraphicGroup.fromJSON(json);
      case "arc":
        return GraphicArc.fromJSON(json);
      case "rect":
        return GraphicRect.fromJSON(json);
      case "line":
        return GraphicLine.fromJSON(json);
      case "polygon":
        return GraphicPolygon.fromJSON(json);
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
      return obj.map((o: any) => ObjectFactory.toJSON(o));
    }

    if (obj.asJSON && typeof obj.asJSON === "function") {
      return obj.asJSON();
    } else {
      throw new Error("toJSON missing on object:" + obj);
    }
  }
}

export default ObjectFactory;
