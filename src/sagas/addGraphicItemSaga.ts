import { put, call } from "redux-saga/effects";
import * as actions from "../actions";
import { apiCreatePlacementSaga } from "./apiSaga";
import GraphicBase from "../model/graphic/GraphicBase";
import Placement from "../model/Placement";
import { selectGraphicSymbols } from "../reducers/selectors";
import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";
import { updateOneSymbolRef } from "./updateSymbolRef";

// function* updatePlacement(placement: Placement) {
//   const graphic = placement.graphic;
//   if (graphic) {
//     if (graphic.type == "symbolref") {
//       const symbolRef = <GraphicSymbolRef>graphic;
//       const symbols = yield selectGraphicSymbols();
//       updateOneSymbolRef(symbolRef, symbols);
//     }
//   }
// }

const a = 34;

export default a;

// function* addGraphicItemSaga(graphic: GraphicBase) {
//   try {
//     // add tmp-item
//     yield put(actions.addItem(graphic));
//     // save to API
//     const newPlacement = yield call(apiCreatePlacementSaga, graphic);
//     // e.g. set symbol of symbolRef items

//     yield updatePlacement(newPlacement);
//     // replace tmp-item with real item (has .id from api)
//     yield put(actions.removeItem(graphic));
//     yield put(actions.addItem(newPlacement));
//   } catch (err) {
//     console.log("Error:", err);
//   }
// }

// export { addGraphicItemSaga };
