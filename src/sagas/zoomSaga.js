import { put, call, select, cancelled } from "redux-saga/effects";

import { getPointSaga } from "./mouseSaga";

import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";
import ItemRect from "../model/ItemRect";

import TransformCoordinate from "../common/transformCoordinate";

function* setViewport(p1, p2) {
  const x1 = Math.min(p1.x, p2.x);
  const x2 = Math.max(p1.x, p2.x);
  const y1 = Math.min(p1.y, p2.y);
  const y2 = Math.max(p1.y, p2.y);
  const width = x2 - x1;
  const height = y2 - y1;
  const viewport = {
    x: x1,
    y: y1,
    width: width,
    height: height,
  };
  const canvas = yield select(state => state.graphic.canvas);
  const tc = new TransformCoordinate(viewport, canvas);
  const correctedViewport = tc.viewport;
  console.log(viewport, correctedViewport);
  yield put(
    actions.setViewport(
      correctedViewport.x,
      correctedViewport.y,
      correctedViewport.width,
      correctedViewport.height,
    ),
  );
}

function* zoomWindowSaga() {
  let rect;
  try {
    const getPointSagaOptions = {
      useGrid: false,
    };
    const result = yield getPointSaga(
      actionTypes.MOUSE_DOWN,
      getPointSagaOptions,
    );
    if (!result) {
      return;
    }
    const startPoint = result.point;
    rect = new ItemRect(null, startPoint, startPoint);
    yield put(actions.addDynamicItem(rect));
    let run = true;
    while (run) {
      const result = yield getPointSaga(
        [actionTypes.MOUSE_MOVE, actionTypes.MOUSE_UP],
        getPointSagaOptions,
      );
      if (!result) {
        run = false;
      } else {
        const secondPoint = result.point;
        yield put(actions.removeDynamicItem(rect));
        rect = new ItemRect(null, startPoint, secondPoint);
        if (result.type === actionTypes.MOUSE_MOVE) {
          yield put(actions.addDynamicItem(rect));
        } else {
          // window finished
          run = false;
          yield setViewport(startPoint, secondPoint);
        }
      }
    }
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.removeDynamicItem(rect));
    }
  }
}

export { zoomWindowSaga };
