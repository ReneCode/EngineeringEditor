import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";
import { addGraphicItemSaga } from "./addGraphicItemSaga";
import { selectGraphicSymbols } from "../reducers/selectors";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";

import { getPointSaga } from "./mouseSaga";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { put, cancelled } from "redux-saga/effects";
import { IA_CREATE_SYMBOLREF } from "../actions/interactionTypes";

function* createSymbolRefSaga(args: any[]) {
  try {
    const symbolName = args[0];
    if (!symbolName) {
      throw Error("symbol name missing");
    }
    const symbols = yield selectGraphicSymbols();
    const symbol = symbols.find(
      (s: GraphicSymbol) => s.name === symbolName,
    );
    if (!symbol) {
      throw Error("symbol not found:" + symbolName);
    }

    let run = true;
    while (run) {
      const result = yield getPointSaga([
        actionTypes.MOUSE_MOVE,
        actionTypes.MOUSE_DOWN,
      ]);
      actions.setTempItem();
      if (!result) {
        return;
      }
      let symbolRef = new GraphicSymbolRef(
        symbolName,
        result.point,
        symbol,
      );
      yield put(actions.setTempItem(symbolRef));
      if (result.type === actionTypes.MOUSE_MOVE) {
        // symbol on cursor
      } else {
        yield put(actions.setTempItem());
        yield addGraphicItemSaga(symbolRef);
        yield put(
          actions.startInteraction(IA_CREATE_SYMBOLREF, symbolName),
        );

        run = false;
      }
    }
    console.log("finish");
  } catch (ex) {
    console.log("ex:", ex);
  } finally {
    if (yield cancelled()) {
      yield put(actions.setTempItem());
    }
  }
}

export default createSymbolRefSaga;
