import graphql from "./graphql";
import { IdType } from "../../model/types";
import Page from "../../model/Page";

const apiLoadPages = async (projectId: IdType): Promise<Page[]> => {
  const query: string = `query project($id: ID!) {
      project(id: $id) {
        pages { projectId id name }
      }
    }`;
  const variables = {
    id: projectId,
  };

  const data = await graphql(query, variables);
  if (data && data.project) {
    const pages = data.project.pages;
    // create typed Page objects
    const pageObjects = pages.map((p: any) => {
      const page = Object.create(Page.prototype);
      return Object.assign(page, p);
    });
    return pageObjects;
  }
  return [];
};

export default apiLoadPages;
