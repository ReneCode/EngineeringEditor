import { DtoPlacement, decodeJson } from "./dtoUtil";
import Placement from "./Placement";
import GraphicLine from "./graphic/GraphicLine";

class PlacementFactory {
  static fromDTO(dto: DtoPlacement): Placement | Placement[] {
    if (Array.isArray(dto)) {
      return dto.map((item: any) => {
        return <Placement>PlacementFactory.fromDTO(item);
      });
    }

    const json = decodeJson(dto.content);
    let placement: Placement | undefined = undefined;

    switch (dto.type) {
      case "line":
        placement = GraphicLine.fromJSON(json);
        break;
      default:
        throw new Error("bad dto type:" + dto.type);
    }

    placement.id = dto.id;
    placement.type = dto.type;
    placement.projectId = dto.projectId;
    placement.pageId = dto.pageId;
    return placement;
  }
}

export default PlacementFactory;
