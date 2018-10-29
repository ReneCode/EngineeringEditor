import { select, put, call, cancelled } from "redux-saga/effects";

import { getPointSaga } from "./mouseSaga";

import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";

import ItemCircle from "../model/ItemCircle";
import { IA_CREATE_CIRCLE } from "../actions/interactionTypes";

function* createCircleSaga() {
  let circle;
  try {
    const result = yield getPointSaga(actionTypes.MOUSE_DOWN);
    console.log("result:", result);
    if (!result) {
      return;
    }
    const middlePoint = result.point;
    circle = new ItemCircle(null, middlePoint, 0);
    yield put(actions.addDynamicItem(circle));
    const run = true;
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
        yield put(actions.removeDynamicItem(circle));
        circle = new ItemCircle(null, middlePoint, radius);
        if (result.type === actionTypes.MOUSE_MOVE) {
          yield put(actions.addDynamicItem(circle));
        } else {
          yield put(actions.saveGraphicItem(circle));
          yield put(actions.startInteraction(IA_CREATE_CIRCLE));
        }
      }
    }
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.removeDynamicItem(circle));
    }
  }
}

export { createCircleSaga };
