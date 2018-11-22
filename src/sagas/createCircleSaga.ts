import { put, call, cancelled } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";

import { IA_CREATE_CIRCLE } from "../actions/interactionTypes";
import GraphicCircle from "../model/graphic/GraphicCircle";
import { addGraphicItemSaga } from "./addGraphicItemSaga";
import { getPointSaga } from "./getPointSaga";

function* createCircleSaga() {
  let circle;
  try {
    const result = yield call(getPointSaga, actionTypes.MOUSE_DOWN);
    if (!result) {
      return;
    }
    const middlePoint = result.point;
    circle = new GraphicCircle(middlePoint, 0);
    yield put(actions.setTempItem(circle));
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
        const radius = secondPoint.sub(middlePoint).length();
        circle = new GraphicCircle(middlePoint, radius);
        yield put(actions.setTempItem(circle));
        if (result.type === actionTypes.MOUSE_MOVE) {
          // rubberband
        } else {
          yield put(actions.setTempItem());
          if (radius > 0) {
            yield addGraphicItemSaga(circle);
            yield put(actions.startInteraction(IA_CREATE_CIRCLE));
          } else {
            run = false;
          }
        }
      }
    }
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.removeSelectedItem(circle));
      yield put(actions.setTempItem());
    }
  }
}

export { createCircleSaga };
