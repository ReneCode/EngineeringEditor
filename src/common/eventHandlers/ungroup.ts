import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { cudElementAction } from "../../actions/changeElementActions";
import GraphicGroup from "../../model/graphic/GraphicGroup";
import PaperUtil from "../../utils/PaperUtil";
import store from "../../store";
import Placement from "../../model/Placement";

const ungroupPlacements = (placementIds: string[]) => {
  const placements = PaperUtil.getPlacementsById(placementIds);

  let createPlacements: Placement[] = [];
  let deletePlacements: Placement[] = [];
  for (let group of placements) {
    if (group instanceof GraphicGroup) {
      createPlacements = createPlacements.concat(group.children);
      console.log(":", createPlacements);
      deletePlacements.push(group);
    }
  }

  store.dispatch(
    cudElementAction(
      "placement",
      createPlacements,
      undefined,
      deletePlacements,
    ),
  );
};

// self register
const register = () => {
  appEventDispatcher.subscribe("ungroup", ungroupPlacements);
};
register();
