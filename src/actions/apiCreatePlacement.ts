import Placement from "../model/Placement";
import { graphql } from "../common/graphql-api";
import PlacementFactory from "../model/PlacementFactory";

// save to database
const apiCreatePlacementsAction = async (
  placements: Placement[],
): Promise<Placement[]> => {
  const mutation = `mutation createPlacement($input: [CreatePlacementInput]!) {
      createPlacement(input: $input) { id, type, projectId, pageId, content }
    }`;

  const variables = {
    input: placements.map((placement: Placement) => {
      const json: any = PlacementFactory.toDTO(placement);

      return {
        type: json.type,
        projectId: placement.projectId,
        pageId: placement.pageId,
        content: json.content,
      };
    }),
  };
  const result = await graphql(mutation, variables);
  const newItem = PlacementFactory.fromDTO(result.createPlacement);
  return newItem as Placement[];
};

export default apiCreatePlacementsAction;
