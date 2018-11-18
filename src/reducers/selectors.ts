import { select } from "redux-saga/effects";
import { IGlobalState } from "../reducers/index";

export function* selectGraphicSymbols() {
  return yield select((state: IGlobalState) => state.graphic.symbols);
}

export function* selectGraphicSelectedItems() {
  return yield select(
    (state: IGlobalState) => state.graphic.selectedItems,
  );
}

export function* selectProjectId() {
  return yield select(
    (state: IGlobalState) => state.project.projectId,
  );
}

export function* selectPageId() {
  return yield select((state: any) => state.project.pageId);
}
