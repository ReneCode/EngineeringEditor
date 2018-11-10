import { put, call, cancelled } from "redux-saga/effects";

import { getPointSaga } from "./mouseSaga";

import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";

import ItemLine from "../model/ItemLine";
import { IA_CREATE_LINE } from "../actions/interactionTypes";

function* createLineSaga() {
  let line;
  try {
    const result = yield getPointSaga(actionTypes.MOUSE_DOWN);
    if (!result) {
      return;
    }
    const startPoint = result.point;
    line = new ItemLine("", startPoint, startPoint);
    yield put(actions.setTempItem(line));
    let run = true;
    while (run) {
      const result = yield getPointSaga([
        actionTypes.MOUSE_MOVE,
        actionTypes.MOUSE_UP,
      ]);
      if (!result) {
        run = false;
      } else {
        const secondPoint = result.point;
        line = new ItemLine("", startPoint, secondPoint);
        yield put(actions.setTempItem(line));
        if (result.type === actionTypes.MOUSE_MOVE) {
          // rubberband
        } else {
          // finish line
          yield put(actions.setTempItem());

          if (!secondPoint.equal(startPoint)) {
            yield put(actions.saveGraphicItem(line));
            yield put(actions.startInteraction(IA_CREATE_LINE));
          } else {
            run = false;
          }
        }
      }
    }
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.removeSelectedItem(line));
    }
  }
}

export { createLineSaga };