import { put, call } from "redux-saga/effects";
import * as actions from "../actions";
import { apiCreatePlacementSaga } from "./apiSaga";
import GraphicBase from "../model/graphic/GraphicBase";

function* addGraphicItemSaga(graphic: GraphicBase) {
  try {
    // add tmp-item
    yield put(actions.addGraphicItem(graphic));
    // save to API
    const newItem = yield call(apiCreatePlacementSaga, graphic);
    // replace tmp-item with real item (has .id from api)
    yield put(actions.removeGraphicItem(graphic));
    yield put(actions.addGraphicItem(newItem));
  } catch (err) {
    console.log("Error:", err);
  }
}

export { addGraphicItemSaga };