import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";
import { addGraphicItemSaga } from "./addGraphicItemSaga";
function* createSymbolRefSaga(args: any[]) {
  try {
    const symbolName = args[0];
    if (!symbolName) {
      throw Error("symbol name missing");
    }

    const symbolRef = new GraphicSymbolRef(symbolName);

    yield addGraphicItemSaga(symbolRef);
    console.log(args);
  } catch (ex) {
    console.log("ex:", ex);
  }
}

export default createSymbolRefSaga;
