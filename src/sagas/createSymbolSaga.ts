import { call, put, select } from "redux-saga/effects";
import { getPointSaga } from "./mouseSaga";
import { MOUSE_DOWN } from "../actions/actionTypes";
import * as actions from "../actions";
import {
  apiSaveSymbolSaga,
  apiCreatePlacementSaga,
  apiDeletePlacementsSaga,
} from "./apiSaga";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";
import Placement from "../model/Placement";
import { selectGraphicSymbols } from "../reducers/selectors";
import { updateGraphicsSymbolRef } from "./updateSymbolRef";

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

    const projectId = yield select(
      (state: any) => state.project.projectId,
    );
    const symbolName = "symbol-" + Math.floor(1000 * Math.random());
    const symbol = new GraphicSymbol(projectId, symbolName);
    symbol.items = selectedItems.map((p: Placement) => p.graphic);
    symbol.insertPt = result.point;

    const newSymbol = yield call(apiSaveSymbolSaga, symbol);
    // if there are symbolRef in ths new symbol
    // the GraphicSymbol .symbol property is no more set
    // we have to update it
    const symbols = yield selectGraphicSymbols();
    updateGraphicsSymbolRef(newSymbol.items, symbols);

    yield put(actions.addSymbol(newSymbol));

    const symbolRef = new GraphicSymbolRef(symbol.name);
    const placement: Placement = yield call(
      apiCreatePlacementSaga,
      symbolRef,
    );
    const newSymbolRef = <GraphicSymbolRef>placement.graphic;
    newSymbolRef.symbol = newSymbol;
    yield put(actions.addGraphicItem(placement));
    yield call(apiDeletePlacementsSaga, selectedItems);

    yield put(actions.removeGraphicItem(selectedItems));
    yield put(actions.removeSelectedItem(selectedItems));
  } catch (ex) {}
}

export default createSymbolSaga;
