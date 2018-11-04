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
import { delay } from "redux-saga";
import { getPointSaga } from "./mouseSaga";
import { MOUSE_UP } from "../actions/actionTypes";
import { moveGraphicItemSaga } from "./moveGraphicItemSaga";

function* selectGraphicItemSaga() {
  try {
    const { items, point } = yield call(pickItemsSaga, "select");
    if (items.length === 0) {
      yield put(actions.clearDynamicItems());
    } else {
      yield put(actions.addDynamicItem(items));

      // when mouse-up receives in the next 100 ms
      // then selectSaga is finished
      // otherwise we start a moving the selected items
      const { delayResult, mouseUpResult } = yield race({
        delayResult: call(delay, 100),
        mouseUpResult: call(getPointSaga, MOUSE_UP),
      });

      if (mouseUpResult) {
        // finish selection
      } else {
        // we have already the the first point
        yield call(moveGraphicItemSaga, point);
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

export { selectGraphicItemSaga };
