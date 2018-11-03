import {
  put,
  call,
  race,
  cancelled,
  select,
} from "redux-saga/effects";

import * as actions from "../actions";
import { pickItemsSaga } from "./pickItemsSaga";
import { IA_SELECT } from "../actions/interactionTypes";
import { getTwoPointsSaga } from "./getTwoPointsSaga";
import Point from "../common/point";
import { delay } from "redux-saga";
import { getPointSaga } from "./mouseSaga";
import { MOUSE_UP } from "../actions/actionTypes";
import ItemBase from "../model/ItemBase";
import { apiChangeGraphicItem } from "./apiSaga";

function* selectSaga() {
  try {
    const { items, point } = yield call(pickItemsSaga, "select");
    if (items.length === 0) {
      yield put(actions.clearDynamicItems());
    } else {
      yield put(actions.addDynamicItem(items));

      // when mouse-up receives in the next 500 ms
      // then selectSaga is finished
      // otherwise we start a moveing the selected items
      const { delayResult, mouseUpResult } = yield race({
        delayResult: call(delay, 500),
        mouseUpResult: call(getPointSaga, MOUSE_UP),
      });

      if (mouseUpResult) {
        // finish
      } else {
        // get two points, with first point given

        const result = yield call(getTwoPointsSaga, point);
        const delta = result.p2.sub(result.p1);
        const dynamicItems = yield select(
          (state: any) => state.graphic.dynamicItems,
        );
        const movedItems = dynamicItems.map((item: ItemBase) =>
          item.translate(delta),
        );

        yield put(actions.removeDynamicItem(dynamicItems));
        yield put(actions.changeGraphicItem(movedItems));
        yield put(actions.addDynamicItem(movedItems));

        yield call(apiChangeGraphicItem, movedItems);
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

export { selectSaga };
