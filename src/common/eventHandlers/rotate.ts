import appEventDispatcher from "../Event/AppEventDispatcher";
import GraphicConnectionPoint from "../../model/graphic/GraphicConnectionPoint";
import store from "../../store/index";
import { cudElementAction } from "../../actions/changeElementActions";
import PaperUtil from "../../utils/PaperUtil";

const rotatePlacements = (placementIds: string[]) => {
  if (!placementIds || placementIds.length === 0) {
    return;
  }
  const placements = PaperUtil.getPlacementsById(placementIds);

  const connectionPoints = placements
    .filter(p => p.type === "connectionpoint")
    .map(p => p.clone() as GraphicConnectionPoint);

  connectionPoints.map(cp => cp.rotate());
  store.dispatch(
    cudElementAction("placement", undefined, connectionPoints),
  );
};

// self register
const register = () => {
  appEventDispatcher.subscribe("rotate", rotatePlacements);
};
register();
