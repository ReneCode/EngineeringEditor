import { decodeJson, encodeJson, DtoElement } from "./dtoUtil";
import ObjectFactory from "./ObjectFactory";
import GraphicSymbol from "./graphic/GraphicSymbol";

class ElementFactory {
  static toDTO(obj: GraphicSymbol): DtoElement {
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
    const content = encodeJson(json);
    return {
      projectId: obj.projectId,
      name: obj.name,
      id: obj.id,
      type: "symbol",
      content: content,
    };
  }

  static fromDTO(
    dto: DtoElement | DtoElement[],
  ): GraphicSymbol | GraphicSymbol[] {
    if (Array.isArray(dto)) {
      return dto.map((item: any) => {
        return <GraphicSymbol>ElementFactory.fromDTO(item);
      });
    }

    const json = decodeJson(dto.content);
    json.type = dto.type;
    let symbol = ObjectFactory.fromJSON(json) as GraphicSymbol;

    symbol.id = dto.id;
    symbol.projectId = dto.projectId;
    symbol.name = dto.name;
    return symbol;
  }
}

export default ElementFactory;
