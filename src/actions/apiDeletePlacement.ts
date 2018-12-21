import Placement from "../model/Placement";
import { graphql } from "../common/graphql-api";

export const apiDeletePlacement = (placements: Placement[]) => {
  // redux-thunk
  return async () => {
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
    const result = await graphql(mutation, variables);
    return result;
  };
};
