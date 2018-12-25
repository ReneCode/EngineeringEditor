import Placement from "../model/Placement";
import * as actions from "../actions";
import { put } from "redux-saga/effects";
import { graphql } from "../common/graphql-api";
import PlacementFactory from "../model/PlacementFactory";

/*
  updates the backend and the store
*/
function* updatePlacementSaga(placements: Placement[]) {
  try {
    if (!Array.isArray(placements)) {
      placements = [placements];
    }

    yield put(actions.updatePlacement(placements));
    yield apiUpdatePlacementSaga(placements);
  } catch (ex) {
    console.log("EX:", ex);
  }
}

function* apiUpdatePlacementSaga(placements: Placement[]) {
  const mutation = `mutation updatePlacements($input: [UpdatePlacementInput]!) {
    updatePlacements(input: $input) 
  }`;
  const variables = {
    input: placements.map((placement: Placement) => {
      const json: any = PlacementFactory.toDTO(placement);
      return {
        projectId: placement.projectId,
        pageId: placement.pageId,
        id: placement.id,
        graphic: json.graphic,
      };
    }),
  };
  yield graphql(mutation, variables);
}

export default updatePlacementSaga;
