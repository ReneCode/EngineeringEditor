import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import store from "../../store";
import PaperUtil from "../../utils/PaperUtil";
import { setCopyData } from "../../actions/graphicActions";

const onCopy = () => {
  console.log("copy");
  const placementIds = PaperUtil.getSelectedPlacementIds();
  const placements = PaperUtil.getPlacementsById(placementIds);

  const json = placements.map(p => p.toJSON());
  store.dispatch(setCopyData(json));
};

// self register
const register = () => {
  appEventDispatcher.subscribe("copy", onCopy);
};
register();
