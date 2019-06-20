import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { setSelectedPlacementIds } from "../../actions/graphicActions";
import store from "../../store";

const selectAllPlacements = () => {
  const paperItems = Paper.project.activeLayer.children;
  const ids = paperItems
    .map(item => {
      const id = item.data;
      if (id) {
        return id;
      }
      return null;
    })
    .filter(id => !!id);
  store.dispatch(setSelectedPlacementIds(ids));
};

// self register
const register = () => {
  appEventDispatcher.subscribe("selectAll", selectAllPlacements);
};
register();
