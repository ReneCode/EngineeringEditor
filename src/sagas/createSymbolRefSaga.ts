import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";
import * as actions from "../actions";
import { put } from "redux-saga/effects";
function* createSymbolRefSaga(args: any[]) {
  try {
    const symbolName = args[0];
    if (!symbolName) {
      throw Error("symbol name missing");
    }

    const symbolRef = new GraphicSymbolRef(symbolName);

    yield put(actions.saveGraphicItem(symbolRef));
    console.log(args);
  } catch (ex) {
    console.log("ex:", ex);
  }
}

export default createSymbolRefSaga;
