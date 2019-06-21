import { showModalAction } from "../../actions";
import store from "../../store";
import { ModalIdType } from "../../model/types";
import appEventDispatcher from "../Event/AppEventDispatcher";

const showModal = (modalId: ModalIdType) => {
  store.dispatch(showModalAction(modalId));
};

// self register
const register = () => {
  appEventDispatcher.subscribe("showModal", showModal);
};
register();
