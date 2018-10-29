import { take, select } from "redux-saga/effects";
import Point from "../common/Point";

function* getPointSaga(waitingForTypes) {
  if (!Array.isArray(waitingForTypes)) {
    waitingForTypes = [waitingForTypes];
  }
  const { type, payload } = yield take(waitingForTypes);
  const canvas = yield select(state => state.graphic.canvas);

  // bottom-left is 0,0
  // snap to grid
  const point = new Point(payload.x, canvas.height - payload.y).snap(
    canvas.gridX,
    canvas.gridY,
  );

  return {
    type,
    point,
  };
}

export { getPointSaga };
