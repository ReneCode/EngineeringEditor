import Paper from "paper";
import GraphicLine from "./graphic/GraphicLine";
import GraphicPolygon from "./graphic/GraphicPolygon";
import GraphicCircle from "./graphic/GraphicCircle";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";
import GraphicSymbol from "./graphic/GraphicSymbol";
import GraphicConnectionPoint from "./graphic/GraphicConnectionPoint";
import GraphicText from "./graphic/GraphicText";
import GraphicRect from "./graphic/GraphicRect";
import PaperPlacement from "./graphic/PaperPlacement";
import GraphicArc from "./graphic/GraphicArc";
import Placement from "./Placement";

class ObjectFactory {
  static fromJSON(json: any): object | object[] {
    if (Array.isArray(json)) {
      if (typeof json[0] === "string") {
        // Paper Json
        let paperItem: Paper.Item = new Paper.Item();
        // className of Paper Item
        switch (json[0]) {
          case "Path":
            paperItem = new Paper.Path();
            break;
          default:
            throw new Error("bad paper className:" + json[0]);
        }
        paperItem.importJSON(json as any);
        return new PaperPlacement(paperItem);
      } else {
        return json.map((obj: any) => ObjectFactory.fromJSON(obj));
      }
    }

    switch (json.type) {
      case "arc":
        return GraphicArc.fromJSON(json);
      case "rect":
        return GraphicRect.fromJSON(json);
      case "line":
        return GraphicLine.fromJSON(json);
      case "polygon":
        return GraphicPolygon.fromJSON(json);
      case "circle":
        return GraphicCircle.fromJSON(json);
      case "symbolref":
        return GraphicSymbolRef.fromJSON(json);
      case "symbol":
        return new Placement(json.type);
      //   return GraphicSymbol.fromJSON(json);
      // case "connectionpoint":
      //   return GraphicConnectionPoint.fromJSON(json);
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
