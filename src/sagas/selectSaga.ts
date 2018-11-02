import { put, select } from "redux-saga/effects";

import { getPointSaga } from "./mouseSaga";

import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";
import ItemBase from "../model/ItemBase";
import { IA_SELECT } from "../actions/interactionTypes";

function* selectSaga() {
  try {
    const getPointSagaOptions = {
      useGrid: false,
    };
    const result = yield getPointSaga(
      actionTypes.MOUSE_DOWN,
      getPointSagaOptions,
    );
    if (!result) {
      return;
    }
    const point = result.point;
    const pickRadius = 10;

    const items = yield select((state: any) => state.graphic.items);

    const selectedItems = items.filter((item: ItemBase) => {
      return item.nearPoint(point, pickRadius);
    });
    if (selectedItems.length === 0) {
      yield put(actions.clearDynamicItems());
    } else {
      yield put(actions.addDynamicItem(selectedItems));
    }
    yield put(actions.startInteraction(IA_SELECT));

    // yield put(actions.addDynamicItem(rect));
  } catch (ex) {}
}

export { selectSaga };
