import { graphql } from "./graphql-api";
import { IdType } from "../../model/types";
import Page from "../../model/Page";

const apiLoadPages = async (projectId: IdType): Promise<Page[]> => {
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

export default apiLoadPages;
