import { put, call } from "redux-saga/effects";
import * as actions from "../actions";
import { apiSaveGraphicItemSaga } from "./apiSaga";
import GraphicBase from "../model/graphic/GraphicBase";

function* saveGraphicItemSaga(action: any) {
  try {
    const graphic: any = action.payload;
    if (!(graphic instanceof GraphicBase)) {
      throw new Error("bad graphic:" + graphic);
    }
    // add tmp-item
    yield put(actions.addGraphicItem(graphic));
    // save to API
    const newItem = yield call(apiSaveGraphicItemSaga, graphic);
    // replace tmp-item with real item (has .id from api)
    yield put(actions.removeGraphicItem(graphic));
    yield put(actions.addGraphicItem(newItem));
  } catch (err) {
    console.log("Error:", err);
  }
}

export { saveGraphicItemSaga };
