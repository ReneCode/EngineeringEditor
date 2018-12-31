import Placement from "../model/Placement";
import { graphql } from "../common/graphql-api";
import PlacementFactory from "../model/PlacementFactory";

// -> Placement
const apiCreatePlacement = async (
  placements: Placement[],
): Promise<Placement> => {
  try {
    // save to database
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
    console.log(":", variables);
    const result = await graphql(mutation, variables);
    const newItem = PlacementFactory.fromDTO(result.createPlacement);
    return newItem as Placement;
  } catch (err) {
    throw new Error(err);
  }
};

export default apiCreatePlacement;
