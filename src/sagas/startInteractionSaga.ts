import { call } from "redux-saga/effects";

import { createLineSaga } from "./createLineSaga";
import { createCircleSaga } from "./createCircleSaga";
import { zoomWindowSaga } from "./zoomSaga";
import { selectGraphicItemSaga } from "./selectGraphicItemSaga";
import { deleteItemSaga } from "./deleteItemSaga";
import { moveGraphicItemSaga } from "./moveGraphicItemSaga";
import { createGroupSaga } from "./createGroupSaga";
import createSymbolSaga from "./createSymbolSaga";
import createSymbolRefSaga from "./createSymbolRefSaga";

function* startInteractionSaga(action: any) {
  const iaType = action.payload.type;
  const sagas: any = {
    IA_CREATE_CIRCLE: createCircleSaga,
    // IA_CREATE_LINE: createLineSaga,
    IA_ZOOM_WINDOW: zoomWindowSaga,
    IA_SELECT: selectGraphicItemSaga,
    IA_MOVE: moveGraphicItemSaga,
    IA_DELETE_ITEM: deleteItemSaga,
    IA_CREATE_GROUP: createGroupSaga,
    IA_CREATE_SYMBOL: createSymbolSaga,
    IA_CREATE_SYMBOLREF: createSymbolRefSaga,
  };

  const saga = sagas[iaType];
  if (saga) {
    yield call(saga, action.payload.args);
    return;
  } else {
    // throw new Error(`bad interaction: ${iaType}`);
  }
}

export { startInteractionSaga };
