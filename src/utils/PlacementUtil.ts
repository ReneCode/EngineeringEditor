import Placement from "../model/Placement";
import { PlacementType } from "../model/types";
import GraphicText from "../model/graphic/GraphicText";
import store from "../store";
import { cudElementAction } from "../actions/changeElementActions";

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

  static updatePlacement(placement: Placement) {
    store.dispatch(
      cudElementAction("placement", undefined, placement),
    );
  }
}

export default PlacementUtil;
