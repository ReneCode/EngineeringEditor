import { decodeJson, encodeJson, DtoElement } from "./dtoUtil";
import ObjectFactory from "./ObjectFactory";
import GraphicSymbol from "./graphic/GraphicSymbol";
import { GraphicType } from "./types";

class ElementFactory {
  static toDTO(symbol: GraphicSymbol): DtoElement {
    /*
    const rawItems = obj.placements.map(p => {
      return {
        ...p,
        pageId: undefined,
        id: undefined,
        symbol:
          p.type === "symbolref" ? undefined : (p as any).symbol,
      };
    });
    const modifiedObject = {
      ...obj,
      items: rawItems,
    };
    const json = Object.assign({}, modifiedObject);
    */

    let json: {
      type?: GraphicType;
      id?: string;
      projectId?: string;
      name?: string;
    } = {};
    json = ObjectFactory.toJSON(symbol);
    delete json.id;
    delete json.projectId;
    delete json.type;
    delete json.name;

    const content = encodeJson(json);
    return {
      projectId: symbol.projectId,
      name: symbol.name,
      id: symbol.id,
      type: symbol.type,
      content: content,
    };
  }

  static fromDTO(
    dto: DtoElement | DtoElement[],
  ): GraphicSymbol | GraphicSymbol[] {
    if (Array.isArray(dto)) {
      return dto.map((item: any) => {
        return ElementFactory.fromDTO(item) as GraphicSymbol;
      });
    }

    const json = decodeJson(dto.content);
    json.type = dto.type;
    let symbol = ObjectFactory.fromJSON(json) as GraphicSymbol;

    symbol.id = dto.id;
    symbol.projectId = dto.projectId;
    symbol.name = dto.name;
    symbol.type = dto.type;
    return symbol;
  }
}

export default ElementFactory;
