import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import { graphql } from "../graphql-api";
import ElementFactory from "../../model/ElementFactory";

const apiSaveSymbol = async (
  symbol: GraphicSymbol,
): Promise<GraphicSymbol> => {
  // save to database

  let mutation = `mutation createElement($input: CreateElementInput!) {
      createElement(input: $input) { projectId id name type content }
    }`;
  console.log("1:", symbol);
  debugger;
  const dto = ElementFactory.toDTO(symbol);
  console.log("2:", dto);
  let variables = {
    input: {
      projectId: dto.projectId,
      type: dto.type,
      name: dto.name,
      content: dto.content,
    },
  };
  const data = await graphql(mutation, variables);
  console.log("3:", data);

  const newSymbol = ElementFactory.fromDTO(data.createElement);
  return newSymbol as GraphicSymbol;
};

export default apiSaveSymbol;
