import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { cudElementAction } from "../../actions/changeElementActions";
import store from "../../store";
import { setSelectedPlacementIds } from "../../actions/graphicActions";
import ObjectFactory from "../../model/ObjectFactory";
import Placement from "../../model/Placement";
import { Point } from "paper";

const onPaste = () => {
  const copyData = ObjectFactory.fromJSON(
    store.getState().graphic.copyData,
  );
  if (!copyData || !Array.isArray(copyData)) {
    return;
  }

  const newPlacements: Placement[] = [];
  for (let placement of copyData) {
    if (placement instanceof Placement) {
      // create a totaly new Placement
      placement.createNewId();
      // create it on the current page/project
      placement.pageId = "";
      placement.projectId = "";
      placement.translate(new Point(10, 10));
      newPlacements.push(placement);
    }
  }
  const ids = newPlacements.map(p => p.id);
  store.dispatch(cudElementAction("placement", newPlacements));
  store.dispatch(setSelectedPlacementIds(ids));
};

// self register
const register = () => {
  appEventDispatcher.subscribe("paste", onPaste);
};
register();
