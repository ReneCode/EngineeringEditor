import { graphql } from "../common/graphql-api";
import { IdType } from "../model/types";

export const apiLoadPage = async (projectId: IdType) => {
  const query: string = `query project($id: ID!) {
      project(id: $id) {
        pages { id name }
      }
    }`;
  const variables = {
    id: projectId,
  };

  const data = await graphql(query, variables);
  const pages = data.project.pages;
  return pages;
};
