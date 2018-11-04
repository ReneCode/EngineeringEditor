import { put, cancelled } from "redux-saga/effects";

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
    line = new ItemLine(null, startPoint, startPoint);
    yield put(actions.addSelectedItem(line));
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
        yield put(actions.removeSelectedItem(line));
        line = new ItemLine(null, startPoint, secondPoint);
        if (result.type === actionTypes.MOUSE_MOVE) {
          yield put(actions.addSelectedItem(line));
        } else {
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
