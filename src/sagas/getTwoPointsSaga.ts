import { put, call, cancelled } from "redux-saga/effects";

import * as actions from "../actions";
import { pickItemsSaga } from "./pickItemsSaga";
import { IA_SELECT } from "../actions/interactionTypes";
import Point from "../common/point";
import { getPointSaga } from "./mouseSaga";
import {
  MOUSE_DOWN,
  MOUSE_UP,
  MOUSE_MOVE,
} from "../actions/actionTypes";

function* getTwoPointsSaga(firstPoint: Point | null = null) {
  try {
    if (!firstPoint) {
      let result = yield call(getPointSaga, MOUSE_DOWN);
      firstPoint = result.point;
    }

    let run = true;
    let secondPoint: Point = new Point();
    while (run) {
      const result = yield call(getPointSaga, [MOUSE_UP, MOUSE_MOVE]);

      switch (result.type) {
        case MOUSE_MOVE:
          break;

        case MOUSE_UP:
          secondPoint = result.point;
          run = false;

        default:
      }
    }
    return {
      p1: firstPoint,
      p2: secondPoint,
    };
  } catch (ex) {
  } finally {
  }
}

export { getTwoPointsSaga };
