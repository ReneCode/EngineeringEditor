import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { cudElementAction } from "../../actions/changeElementActions";
import store from "../../store";
import PaperUtil from "../../utils/PaperUtil";

const onDelete = (placementIds: string[]) => {
  console.log("delete");
  const placements = PaperUtil.getPlacementsById(placementIds);
  store.dispatch(
    cudElementAction("placement", undefined, undefined, placements),
  );
};

// self register
const register = () => {
  appEventDispatcher.subscribe("delete", onDelete);
};
register();
