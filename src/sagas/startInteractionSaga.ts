import { call } from "redux-saga/effects";

import { createGroupSaga } from "./createGroupSaga";

function* startInteractionSaga(action: any) {
  const iaType = action.payload.type;
  const sagas: any = {
    IA_CREATE_GROUP: createGroupSaga,
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
