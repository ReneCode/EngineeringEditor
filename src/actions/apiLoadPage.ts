import { graphql } from "../common/graphql-api";
import { IdType } from "../model/types";
import Page from "../model/Page";

export const apiLoadPagesAction = async (
  projectId: IdType,
): Promise<Page[]> => {
  const query: string = `query project($id: ID!) {
      project(id: $id) {
        pages { id name }
      }
    }`;
  const variables = {
    id: projectId,
  };

  const data = await graphql(query, variables);
  if (data && data.project) {
    const pages = data.project.pages;
    return pages;
  }
  return [];
};
