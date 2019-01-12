import { decodeJson, encodeJson, DtoElement } from "./dtoUtil";
import ObjectFactory from "./ObjectFactory";
import GraphicSymbol from "./graphic/GraphicSymbol";

class ElementFactory {
  static toDTO(obj: GraphicSymbol): DtoElement {
    const rawItems = obj.items.map(p => {
      return {
        ...p,
        projectId: undefined,
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
    delete json.id;
    delete json.name;
    delete json.projectId;
    delete json.type;
    const content = encodeJson(json);
    return {
      projectId: obj.projectId,
      name: obj.name,
      id: obj.id,
      type: obj.type,
      content: encodeJson(json),
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
    symbol.type = dto.type;
    symbol.projectId = dto.projectId;
    symbol.name = dto.name;
    return symbol;
  }
}

export default ElementFactory;
