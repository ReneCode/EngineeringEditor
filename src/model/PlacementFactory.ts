import { DtoPlacement, decodeJson, encodeJson } from "./dtoUtil";
import Placement from "./Placement";
import ObjectFactory from "./ObjectFactory";

class PlacementFactory {
  static toDTO(
    obj: Placement | Placement[],
  ): DtoPlacement | DtoPlacement[] {
    if (!obj) {
      throw new Error("placement missing");
    }

    if (Array.isArray(obj)) {
      return obj.map(o => PlacementFactory.toDTO(o) as DtoPlacement);
    }

    let json: {
      type?: string;
      id?: string;
      pageId?: string;
      projectId?: string;
    } = {};

    // const jsonContent = obj.toJsonContent();
    // if (jsonContent) {
    //   json = jsonContent as any;
    // } else {
    //   json = Object.assign({}, obj);
    // }
    json = obj.toJSON();

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
  ): Placement | Placement[] | null {
    if (Array.isArray(dto)) {
      const placements: Placement[] = [];
      for (let item of dto) {
        const placement = PlacementFactory.fromDTO(item);
        if (placement) {
          placements.push(placement as Placement);
        }
      }
      return placements;
    }

    if (!dto) {
      throw new Error("dto is null");
    }
    const json = decodeJson(dto.content);
    json.type = dto.type;
    const placement = ObjectFactory.fromJSON(json) as Placement;
    if (!placement) {
      return null;
    }

    placement.id = dto.id;
    placement.type = dto.type;
    placement.projectId = dto.projectId;
    placement.pageId = dto.pageId;
    return placement;
  }
}

export default PlacementFactory;
