import GraphicBase from "../model/graphic/GraphicBase";
import * as actions from ".";
import { IGlobalState } from "../reducers";
import { IdType } from "../model/types";
import Placement from "../model/Placement";
import { graphql } from "../common/graphql-api";

const apiDeletePlacement = async (placements: Placement[]) => {
  const mutation = `mutation M($input: [DeletePlacementInput]!) {
    deletePlacements(input: $input)
  }`;
  let variables = {
    input: placements.map((i: Placement) => {
      return {
        projectId: i.projectId,
        pageId: i.pageId,
        id: i.id,
      };
    }),
  };
  await graphql(mutation, variables);
};

export const deletePlacement = (placements: Placement[]) => {
  // redux-thunk
  return async (dispatch: Function, getState: Function) => {
    const result = await apiDeletePlacement(placements);
    return result;
  };
};
