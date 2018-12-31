import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { graphql } from "../common/graphql-api";
import ElementFactory from "../model/ElementFactory";

// save to database
const apiCreateSymbol = async (
  symbol: GraphicSymbol,
): Promise<GraphicSymbol> => {
  let mutation = `mutation createElement($input: CreateElementInput!) {
      createElement(input: $input) { projectId id name type content }
    }`;
  const dto = ElementFactory.toDTO(symbol);
  let variables = {
    input: {
      projectId: dto.projectId,
      type: dto.type,
      name: dto.name,
      content: dto.content,
    },
  };
  const data = await graphql(mutation, variables);

  const newSymbol = ElementFactory.fromDTO(data.createElement);
  return newSymbol as GraphicSymbol;
};

export default apiCreateSymbol;
