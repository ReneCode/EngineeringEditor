import { take, select } from "redux-saga/effects";
import Point from "../common/Point";
/*
import Point from "../models/Point";

function* getSvgPointFromEvent(event) {
  const getSvgState = state => state.svg;
  const svgState = yield select(getSvgState);

  let pt = event.currentTarget.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  const transformMatrix = event.currentTarget
    .getScreenCTM()
    .inverse();
  pt = pt.matrixTransform(transformMatrix);
  return new Point(
    (pt.x - svgState.translateX) / svgState.scale,
    (pt.y - svgState.translateY) / svgState.scale,
  );
}

function getScreenPointFromEvent(event) {
  return new Point(event.clientX, event.clientY);
}

function* getSVGPointSaga(waitingForTypes) {
  if (!Array.isArray(waitingForTypes)) {
    waitingForTypes = [waitingForTypes];
  }
  const { type, event } = yield take(waitingForTypes);
  return {
    type,
    point: yield getSvgPointFromEvent(event),
  };
}

function* getScreenPointSaga(waitingForTypes) {
  if (!Array.isArray(waitingForTypes)) {
    waitingForTypes = [waitingForTypes];
  }
  const { type, event } = yield take(waitingForTypes);
  return {
    type,
    point: yield getScreenPointFromEvent(event),
  };
}
*/
function* getPointSaga(waitingForTypes) {
  if (!Array.isArray(waitingForTypes)) {
    waitingForTypes = [waitingForTypes];
  }
  const { type, payload } = yield take(waitingForTypes);
  const canvas = yield select(state => state.graphic.canvas);

  // bottom-left is 0,0
  const point = new Point(payload.x, canvas.height - payload.y);
  console.log(point);
  return {
    type,
    point,
  };

  /*
  const screenPoint = getScreenPointFromEvent(event);
  const svgPoint = yield getSvgPointFromEvent(event);
  return {
    type,
    screenPoint,
    svgPoint,
  };
  */
}

export { getPointSaga };
