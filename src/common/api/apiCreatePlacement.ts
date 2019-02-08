import Placement from "../../model/Placement";
import graphql from "./graphql";
import PlacementFactory from "../../model/PlacementFactory";

// save to database
const apiCreatePlacements = async (
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
        id: placement.id,
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

export default apiCreatePlacements;
