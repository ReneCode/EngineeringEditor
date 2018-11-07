import { call, select } from "redux-saga/effects";
import { getPointSaga } from "./mouseSaga";
import { MOUSE_DOWN } from "../actions/actionTypes";
import Point from "../common/point";
import ItemBase from "../model/ItemBase";
import ItemSymbol from "../model/ItemSymbol";
import { apiSaveSymbolItemSaga } from "./apiSaga";

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
    // const translation = result.point.invert();

    // const symbolItems = selectedItems.map((item: ItemBase) =>
    //   item.translate(translation),
    // );

    const symbol = new ItemSymbol();
    symbol.items = selectedItems;
    symbol.insertPt = result.point;
    symbol.name = "new symbol";

    const newSymbol = yield apiSaveSymbolItemSaga(symbol);
  } catch (ex) {}
}

export default createSymbolSaga;
