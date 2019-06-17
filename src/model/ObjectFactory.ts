import GraphicLine from "./graphic/GraphicLine";
import GraphicPolygon from "./graphic/GraphicPolygon";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";
import GraphicSymbol from "./graphic/GraphicSymbol";
import GraphicText from "./graphic/GraphicText";
import GraphicRect from "./graphic/GraphicRect";
import GraphicArc from "./graphic/GraphicArc";
import GraphicGroup from "./graphic/GraphicGroup";
import GraphicConnectionPoint from "./graphic/GraphicConnectionPoint";
// import GraphicDummy from "./graphic/GraphicDummy";

class ObjectFactory {
  static fromJSON(json: any): object | object[] | null {
    if (Array.isArray(json)) {
      const objects = [];
      for (let j of json) {
        if (j.type) {
          const obj = ObjectFactory.fromJSON(j);
          if (obj) {
            objects.push(obj);
          }
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
      case "circle":
        return null;
      // return GraphicDummy.fromJSON(json);
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
      const results = [];
      for (let o of obj) {
        let result = ObjectFactory.toJSON(o);
        if (result) {
          results.push(result);
        }
        return results;
      }
    }

    if (obj.toJSON && typeof obj.toJSON === "function") {
      return obj.toJSON();
    } else {
      throw new Error("toJSON missing on object:" + obj);
    }
  }
}

export default ObjectFactory;
