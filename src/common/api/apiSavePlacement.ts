import Placement from "../../model/Placement";
import GraphicBase from "../../model/graphic/GraphicBase";
import { graphql } from "../graphql-api";
import PlacementFactory from "../../model/PlacementFactory";

const apiSavePlacement = async (
  placement: Placement,
): Promise<Placement | null> => {
  try {
    // save to database
    const json: any = placement.toDTO();
    const mutation = `mutation createPlacement($input: CreatePlacementInput!) {
      createPlacement(input: $input) { id, projectId, pageId, graphic }
    }`;

    const variables = {
      input: {
        projectId: placement.projectId,
        pageId: placement.pageId,
        graphic: json.graphic,
      },
    };
    const result = await graphql(mutation, variables);
    // const newItem = Placement.fromDTO(result.createPlacement);
    const newItem = PlacementFactory.fromDTO(result.createPlacement);
    return newItem as Placement;
  } catch (ex) {
    console.log("Exception:", ex);
    return null;
  }
};

export default apiSavePlacement;
