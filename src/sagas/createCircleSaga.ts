import { put, call, cancelled } from "redux-saga/effects";

import { getPointSaga } from "./mouseSaga";
import { apiSaveGraphicItemSaga } from "../sagas/apiSaga";

import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";

import ItemCircle from "../model/ItemCircle";
import { IA_CREATE_CIRCLE } from "../actions/interactionTypes";

function* createCircleSaga() {
  let circle;
  try {
    const result = yield call(getPointSaga, actionTypes.MOUSE_DOWN);
    if (!result) {
      return;
    }
    const middlePoint = result.point;
    circle = new ItemCircle("", middlePoint, 0);
    yield put(actions.addSelectedItem(circle));
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
        yield put(actions.removeSelectedItem(circle));
        circle = new ItemCircle("", middlePoint, radius);
        if (result.type === actionTypes.MOUSE_MOVE) {
          yield put(actions.addSelectedItem(circle));
        } else {
          if (radius > 0) {
            yield put(actions.saveGraphicItem(circle));
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
    }
  }
}

export { createCircleSaga };
