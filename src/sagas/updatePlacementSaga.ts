import Placement from "../model/Placement";
import { apiUpdatePlacementSaga } from "./apiSaga";
import * as actions from "../actions";
import { put } from "redux-saga/effects";

/*
  updates the backend and the store
*/
function* updatePlacementSaga(placements: Placement[]) {
  try {
    yield put(actions.updatePlacement(placements));
    yield apiUpdatePlacementSaga(placements);
  } catch (ex) {
    console.log("EX:", ex);
  }
}

export default updatePlacementSaga;
