import Placement from "../model/Placement";
import { PlacementType } from "../model/types";

class PlacementUtil {
  static getUniqueType(placements: Placement[]): PlacementType {
    if (!placements || placements.length === 0) {
      return "";
    }

    const type = placements[0].type;
    for (let p of placements) {
      if (p.type !== type) {
        return "";
      }
    }
    return type;
  }
}

export default PlacementUtil;
