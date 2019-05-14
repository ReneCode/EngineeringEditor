import { DtoPlacement, decodeJson, encodeJson } from "./dtoUtil";
import Placement from "./Placement";
import ObjectFactory from "./ObjectFactory";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";

class PlacementFactory {
  static toDTO(
    obj: Placement | Placement[],
  ): DtoPlacement | DtoPlacement[] {
    if (!obj) {
      throw new Error("placement missing");
    }

    if (Array.isArray(obj)) {
      return obj.map(o => <DtoPlacement>PlacementFactory.toDTO(o));
    }

    let json: {
      type?: string;
      id?: string;
      pageId?: string;
      projectId?: string;
    } = {};

    const jsonContent = obj.toJsonContent();
    if (jsonContent) {
      json = jsonContent as any;
    } else {
      json = Object.assign({}, obj);
    }

    // special dto
    if (json.type === "symbolref") {
      delete (json as GraphicSymbolRef).symbol;
    }

    delete json.id;
    delete json.pageId;
    delete json.projectId;
    delete json.type;
    return {
      projectId: obj.projectId,
      pageId: obj.pageId,
      id: obj.id,
      type: obj.type,
      content: encodeJson(json),
    };
  }

  static fromDTO(
    dto: DtoPlacement | DtoPlacement[],
  ): Placement | Placement[] {
    if (Array.isArray(dto)) {
      return dto.map((item: any) => {
        return <Placement>PlacementFactory.fromDTO(item);
      });
    }

    const json = decodeJson(dto.content);
    json.type = dto.type;
    const placement = ObjectFactory.fromJSON(json) as Placement;

    // console.log("::placement:" placement);

    placement.id = dto.id;
    placement.type = dto.type;
    placement.projectId = dto.projectId;
    placement.pageId = dto.pageId;
    return placement;
  }
}

export default PlacementFactory;
