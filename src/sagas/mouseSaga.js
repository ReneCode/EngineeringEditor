import { take, select } from "redux-saga/effects";
import Point from "../common/Point";

import TransformCoordinate from "../common/transformCoordinate";

function* getPointSaga(waitingForTypes, options) {
  let useGrid = true;
  if (options && options.useGrid === false) {
    useGrid = false;
  }

  if (!Array.isArray(waitingForTypes)) {
    waitingForTypes = [waitingForTypes];
  }
  const { type, payload } = yield take(waitingForTypes);
  const canvas = yield select(state => state.graphic.canvas);
  const viewport = yield select(state => state.graphic.viewport);

  const transform = new TransformCoordinate(viewport, canvas);

  // transform canvas point to world-coordinate point
  let point = transform.canvasToWc(payload);

  if (useGrid) {
    // snap to grid
    point = point.snap(canvas.gridX, canvas.gridY);
  }

  return {
    type,
    point,
  };
}

export { getPointSaga };
