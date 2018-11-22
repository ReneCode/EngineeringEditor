import { put, call, select, cancelled } from "redux-saga/effects";

import { getPointSaga } from "./getPointSaga";

import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";

import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import Placement from "../model/Placement";
import { IGlobalState } from "../reducers";
import { selectUseGrid } from "../reducers/selectors";

interface pickItemsSagaResult {
  point: Point;
  items: Array<Placement>;
}

function* pickItemsSaga(cursorMode = "select") {
  // const oldUseGrid = yield selectUseGrid();
  try {
    // yield put(actions.useGrid(false));
    yield put(actions.setCursorMode(cursorMode));
    const result = yield call(getPointSaga, actionTypes.MOUSE_DOWN);
    // yield put(actions.useGrid(oldUseGrid));
    if (!result) {
      return null;
    }
    const point: Point = result.point;
    const graphic = yield select(
      (state: IGlobalState) => state.graphic,
    );
    const { canvas, viewport, items, cursor } = graphic;
    const transform = new TransformCoordinate(viewport, canvas);
    const pickRadius = transform.canvasLengthToWc(
      cursor.radiusScreen,
    );

    const selectedItems: Array<Placement> = items.filter(
      (item: Placement) => {
        return item.nearPoint(point, pickRadius);
      },
    );
    yield put(actions.setCursorMode());
    return {
      point: point,
      items: selectedItems,
    };
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.setCursorMode());
    }
  }
}

export { pickItemsSaga };
