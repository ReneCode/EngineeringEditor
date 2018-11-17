import { select } from "redux-saga/effects";

export function* selectGraphicSymbols() {
  return yield select((state: any) => state.graphic.symbols);
}
