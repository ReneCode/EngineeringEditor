import { call, put, select } from "redux-saga/effects";
import { getPointSaga } from "./mouseSaga";
import { MOUSE_DOWN } from "../actions/actionTypes";
import * as actions from "../actions";
import Point from "../common/point";
import ItemBase from "../model/ItemBase";
import ItemSymbol from "../model/ItemSymbol";
import {
  apiSaveSymbolItemSaga,
  apiSaveGraphicItemSaga,
  apiDeleteGraphicItemSaga,
} from "./apiSaga";
import ItemSymbolRef from "../model/ItemSymbolRef";

function* createSymbolSaga() {
  try {
    const selectedItems = yield select(
      (state: any) => state.graphic.selectedItems,
    );
    if (selectedItems.length === 0) {
      // items has to be selected
      return;
    }

    // get symbol-insert-point
    console.log("pick symbol insert point");
    const result = yield call(getPointSaga, MOUSE_DOWN);
    const symbol = new ItemSymbol();
    symbol.items = selectedItems;
    symbol.insertPt = result.point;
    symbol.name = "new symbol";

    const newSymbol = yield call(apiSaveSymbolItemSaga, symbol);
    yield put(actions.addSymbol(newSymbol));

    const symbolRef = new ItemSymbolRef("");
    symbolRef.symbolName = symbol.name;
    const newSymbolRef = yield call(
      apiSaveGraphicItemSaga,
      symbolRef,
    );
    newSymbolRef.symbol = newSymbol;
    yield put(actions.addGraphicItem(newSymbolRef));
    yield call(apiDeleteGraphicItemSaga, selectedItems);

    yield put(actions.removeGraphicItem(selectedItems));
    yield put(actions.removeSelectedItem(selectedItems));
  } catch (ex) {}
}

export default createSymbolSaga;
