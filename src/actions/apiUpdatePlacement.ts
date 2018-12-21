import Placement from "../model/Placement";
import { graphql } from "../common/graphql-api";

export const apiUpdatePlacement = (placements: Placement[]) => {
  // redux-thunk
  return async () => {
    const mutation = `mutation updatePlacements($input: [UpdatePlacementInput]!) {
      updatePlacements(input: $input) 
    }`;
    const variables = {
      input: placements.map((placement: Placement) => {
        const json: any = placement.toDTO();
        return {
          projectId: placement.projectId,
          pageId: placement.pageId,
          id: placement.id,
          graphic: json.graphic,
        };
      }),
    };
    const result = await graphql(mutation, variables);
    return result;
  };
};
