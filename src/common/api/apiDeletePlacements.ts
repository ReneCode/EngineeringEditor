import Placement from "../../model/Placement";
import { graphql } from "../graphql-api";

const apiDeletePlacements = async (items: Placement[]) => {
  if (!Array.isArray(items)) {
    items = [items];
  }

  const mutation = `mutation M($input: [DeletePlacementInput]!) {
    deletePlacements(input: $input)
  }`;
  let variables = {
    input: items.map((i: Placement) => {
      return {
        projectId: i.projectId,
        pageId: i.pageId,
        id: i.id,
      };
    }),
  };
  await graphql(mutation, variables);
};

export default apiDeletePlacements;
