import {
  put,
  call,
  select,
  cancelled,
  PutEffect,
  CallEffect,
  SelectEffect,
  Effect,
} from "redux-saga/effects";

import { getPointSaga } from "./mouseSaga";

import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";
import ItemBase from "../model/ItemBase";

import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import Placement from "../model/Placement";

interface pickItemsSagaResult {
  point: Point;
  items: Array<Placement>;
}

function* pickItemsSaga(
  cursorMode = "select",
): IterableIterator<pickItemsSagaResult> | IterableIterator<Effect> {
  try {
    const getPointSagaOptions = {
      useGrid: false,
    };
    yield put(actions.setCursorMode(cursorMode));
    const result = yield call(
      getPointSaga,
      actionTypes.MOUSE_DOWN,
      getPointSagaOptions,
    );
    if (!result) {
      return null;
    }
    const point: Point = result.point;
    const graphic = yield select((state: any) => state.graphic);
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
