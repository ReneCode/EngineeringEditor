import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import deepClone from "../deepClone";
import { updateElementAction } from "../../actions/changeElementActions";
import PaperUtil from "../../utils/PaperUtil";
import store from "../../store";

const onChangeProperty = (placementIds: string[], changes: any[]) => {
  if (!placementIds || placementIds.length === 0) {
    return;
  }
  const placements = PaperUtil.getPlacementsById(placementIds);

  const editPlacements = placements.map(p => deepClone(p));
  for (let placement of editPlacements) {
    for (let change of changes) {
      placement[change.property] = change.value;
    }
  }
  store.dispatch(updateElementAction("placement", editPlacements));
};

// self register
const register = () => {
  appEventDispatcher.subscribe("changeProperty", onChangeProperty);
};
register();
