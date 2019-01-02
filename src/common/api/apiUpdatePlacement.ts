import Placement from "../../model/Placement";
import graphql from "./graphql";
import PlacementFactory from "../../model/PlacementFactory";

const apiUpdatePlacement = async (
  placements: Placement[],
): Promise<Placement[]> => {
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
        content: json.content,
      };
    }),
  };
  const result = await graphql(mutation, variables);
  return result;
};

export default apiUpdatePlacement;
