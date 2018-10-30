import { take, select } from "redux-saga/effects";
import Point from "../common/Point";

import TransformCoordinate from "../common/transformCoordinate";

function* getPointSaga(waitingForTypes) {
  if (!Array.isArray(waitingForTypes)) {
    waitingForTypes = [waitingForTypes];
  }
  const { type, payload } = yield take(waitingForTypes);
  const canvas = yield select(state => state.graphic.canvas);
  const viewport = yield select(state => state.graphic.viewport);

  const transform = new TransformCoordinate(viewport, canvas);

  const point = transform
    .canvasToWc(payload)
    .snap(canvas.gridX, canvas.gridY);
  // transform canvas point to world-coordinate point
  // snap to grid

  return {
    type,
    point,
  };
}

export { getPointSaga };
