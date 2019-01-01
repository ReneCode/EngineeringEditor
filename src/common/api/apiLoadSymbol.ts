import { graphql } from "./graphql-api";
import { IdType } from "../../model/types";
import ElementFactory from "../../model/ElementFactory";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";

const apiLoadSymbols = async (
  projectId: IdType,
): Promise<GraphicSymbol[]> => {
  const query = `query Q($projectId: ID!) {
    project(id: $projectId) {
      elements { projectId id name type content }
    }
  }`;
  const variables = {
    projectId,
  };
  const data = await graphql(query, variables);
  if (data && data.project) {
    const json = data.project.elements;
    const symbols = ElementFactory.fromDTO(json);
    return symbols as GraphicSymbol[];
  }
  return [];
};

export default apiLoadSymbols;
