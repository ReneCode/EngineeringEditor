import { DtoPlacement, decodeJson, encodeJson } from "./dtoUtil";
import Placement from "./Placement";
import ObjectFactory from "./ObjectFactory";

class PlacementFactory {
  static toDTO(obj: Placement | Placement[]): any {
    if (!obj) {
      throw new Error("placement missing");
    }

    if (Array.isArray(obj)) {
      return obj.map((o: any) => {
        return <Placement>PlacementFactory.toDTO(o);
      });
    }

    const json = Object.assign({}, obj);
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
    let placement = ObjectFactory.fromJSON(json) as Placement;

    placement.id = dto.id;
    placement.type = dto.type;
    placement.projectId = dto.projectId;
    placement.pageId = dto.pageId;
    return placement;
  }
}

export default PlacementFactory;
