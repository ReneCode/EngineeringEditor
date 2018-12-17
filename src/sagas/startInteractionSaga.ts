import { call } from "redux-saga/effects";

import { moveGraphicItemSaga } from "./moveGraphicItemSaga";
import { createGroupSaga } from "./createGroupSaga";
import createSymbolSaga from "./createSymbolSaga";

function* startInteractionSaga(action: any) {
  const iaType = action.payload.type;
  const sagas: any = {
    IA_CREATE_GROUP: createGroupSaga,
    IA_CREATE_SYMBOL: createSymbolSaga,
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
