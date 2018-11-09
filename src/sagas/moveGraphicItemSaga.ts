import { put, call, cancelled, select } from "redux-saga/effects";

import * as actions from "../actions";
import { IA_SELECT } from "../actions/interactionTypes";
import { getPointSaga } from "./mouseSaga";
import {
  MOUSE_UP,
  MOUSE_MOVE,
  MOUSE_DOWN,
} from "../actions/actionTypes";
import ItemBase from "../model/ItemBase";
import deepClone from "../common/deepClone";
import Point from "../common/point";

function* moveGraphicItemSaga(p1: Point | null = null) {
  try {
    const selectedItems = yield select(
      (state: any) => state.graphic.selectedItems,
    );
    if (selectedItems.length === 0) {
      return;
    }
    const originalItems = deepClone(selectedItems);
    if (p1 === null) {
      const result = yield call(getPointSaga, MOUSE_DOWN, {
        useGrid: false,
      });
      p1 = <Point>result.point;
    }

    let run = true;
    while (run) {
      const result = yield call(
        getPointSaga,
        [MOUSE_MOVE, MOUSE_UP],
        { useGrid: false },
      );
      let p2: Point = result.point;

      if (result.type === MOUSE_UP && p2.equal(p1)) {
        return;
      }

      const delta = p2.sub(p1);
      const movedItems = originalItems.map((item: ItemBase) =>
        item.translate(delta),
      );
      yield put(actions.clearSelectedItem());
      if (result.type === MOUSE_MOVE) {
        yield put(actions.addSelectedItem(movedItems));
      } else {
        run = false;
        // only move if there is a move defined
        yield put(actions.changeGraphicItem(movedItems));
      }
    }

    yield put(actions.startInteraction(IA_SELECT));
  } catch (ex) {
  } finally {
    if (yield cancelled()) {
      yield put(actions.setCursorMode());
    }
  }
}

export { moveGraphicItemSaga };
