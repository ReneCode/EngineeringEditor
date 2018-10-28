import { select, put, cancel, cancelled } from "redux-saga/effects";

import { getPointSaga } from "./mouseSaga";

import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/actions";

import ItemLine from "../model/ItemLine";

function* createLineSaga() {
  let line;
  try {
    const result = yield getPointSaga(actionTypes.MOUSE_DOWN);
    if (!result) {
      return;
    }
    const startPoint = result.point;
    console.log(result);
    line = new ItemLine(startPoint, startPoint);
    yield put(actions.addDynamicItem(line));
    const run = true;
    while (run) {
      const result = yield getPointSaga([
        actionTypes.MOUSE_MOVE,
        actionTypes.MOUSE_UP,
      ]);
      if (!result) {
        return;
      }
      const secondPoint = result.point;
      yield put(actions.removeDynamicItem(line));
      line = new ItemLine(startPoint, secondPoint);
      if (result.type === actionTypes.MOUSE_MOVE) {
        yield put(actions.addDynamicItem(line));
      } else {
        yield put(actions.addGraphicItem(line));
        yield put(actions.createLine());
      }
    }
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.removeDynamicItem(line));
    }
  }
}

export { createLineSaga };
