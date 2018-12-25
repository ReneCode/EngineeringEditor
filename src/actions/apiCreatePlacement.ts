import Placement from "../model/Placement";
import { DtoPlacement } from "../model/dtoUtil";
import { graphql } from "../common/graphql-api";
import PlacementFactory from "../model/PlacementFactory";

// -> Placement
const apiCreatePlacement = async (
  placement: Placement,
): Promise<Placement> => {
  try {
    // save to database
    const json: DtoPlacement = PlacementFactory.toDTO(placement);

    const mutation = `mutation createPlacement($input: CreatePlacementInput!) {
      createPlacement(input: $input) { id, type, projectId, pageId, content }
    }`;
    const variables = {
      input: {
        type: json.type,
        projectId: placement.projectId,
        pageId: placement.pageId,
        content: json.content,
      },
    };
    const result = await graphql(mutation, variables);
    const newItem = PlacementFactory.fromDTO(result.createPlacement);
    return newItem as Placement;
  } catch (err) {
    throw new Error(err);
  }
};

export default apiCreatePlacement;
