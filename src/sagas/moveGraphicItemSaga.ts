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
    const dynamicItems = yield select(
      (state: any) => state.graphic.dynamicItems,
    );
    if (dynamicItems.length === 0) {
      return;
    }
    const originalItems = deepClone(dynamicItems);
    if (p1 === null) {
      const result = yield call(getPointSaga, MOUSE_DOWN);
      p1 = result.point;
    }

    let run = true;
    while (run) {
      const result = yield call(getPointSaga, [MOUSE_MOVE, MOUSE_UP]);
      let p2 = result.point;
      const delta = p2.sub(p1);
      const movedItems = originalItems.map((item: ItemBase) =>
        item.translate(delta),
      );
      yield put(actions.clearDynamicItems());
      if (result.type === MOUSE_MOVE) {
        yield put(actions.addDynamicItem(movedItems));
      } else {
        run = false;
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
