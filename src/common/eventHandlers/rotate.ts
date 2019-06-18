import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import GraphicConnectionPoint from "../../model/graphic/GraphicConnectionPoint";
import store from "../../store/index";
import { cudElementAction } from "../../actions/changeElementActions";
import PaperUtil from "../../utils/PaperUtil";

const register = () => {
  appEventDispatcher.subscribe("rotate", rotatePlacements);
};
register();

const rotatePlacements = (
  type: AppEventType,
  placementIds: string[],
) => {
  console.log("rotate:", placementIds);

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
