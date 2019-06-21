import appEventDispatcher from "../Event/AppEventDispatcher";
import { undoAction, redoAction } from "../../actions/undoRedo";
import store from "../../store";

const undo = () => {
  store.dispatch(undoAction());
};

const redo = () => {
  store.dispatch(redoAction());
};

// self register
const register = () => {
  appEventDispatcher.subscribe("undo", undo);
  appEventDispatcher.subscribe("redo", redo);
};
register();
