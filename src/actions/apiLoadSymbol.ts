import Placement from "../model/Placement";
import { graphql } from "../common/graphql-api";
import { IdType } from "../model/types";
import PlacementFactory from "../model/PlacementFactory";
import ElementFactory from "../model/ElementFactory";

export const apiLoadSymbol = async (projectId: IdType) => {
  const query = `query Q($projectId: ID!) {
    project(id: $projectId) {
      elements { projectId id name type content }
    }
  }`;
  const variables = {
    projectId,
  };
  const data = await graphql(query, variables);
  const json = data.project.elements;
  const symbols = ElementFactory.fromDTO(json);

  return symbols;
};
