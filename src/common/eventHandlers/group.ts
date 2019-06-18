import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { cudElementAction } from "../../actions/changeElementActions";
import GraphicGroup from "../../model/graphic/GraphicGroup";
import store from "../../store";
import PaperUtil from "../../utils/PaperUtil";

const groupPlacements = (placementIds: string[]) => {
  if (!placementIds || placementIds.length === 0) {
    return;
  }
  const placements = PaperUtil.getPlacementsById(placementIds);
  const group = new GraphicGroup(placements);

  store.dispatch(
    cudElementAction("placement", group, undefined, placements),
  );
};

// self register
const register = () => {
  appEventDispatcher.subscribe("group", groupPlacements);
};
register();
